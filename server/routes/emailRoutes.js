import nodemailer from "nodemailer";

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT === "465",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
}

// Bestätigungs-E-Mail HTML-Template
const getConfirmationEmailHTML = (formData) => {
     return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
        }
        .header {
          background-color: #0F3F69;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .field {
          margin-bottom: 15px;
          padding: 10px;
          background-color: #f5f5f5;
          border-radius: 5px;
        }
        .label {
          font-weight: bold;
          color: #0F3F69;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Vielen Dank für Ihre Nachricht!</h1>
        </div>
        <div class="content">
          <p>Hallo ${formData.vorname || 'lieber Interessent'},</p>
          <p>wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
          
          <h3>Ihre übermittelten Daten:</h3>
          ${Object.entries(formData)
            .filter(([key]) => !key.includes('agb') && !key.includes('dsgvo'))
            .map(([key, value]) => `
              <div class="field">
                <span class="label">${formatFieldName(key)}:</span> ${value}
              </div>
            `).join('')}
          
          <p>Mit freundlichen Grüßen,<br>
          Ihr Bremerhavener Formularlotsen Team</p>
        </div>
        <div class="footer">
          <p>Dies ist eine automatische Bestätigungsmail. Bitte antworten Sie nicht direkt auf diese E-Mail.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

const getNotificationEmailHTML = (formData) => {
     return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #EEE655;
          color: #0c0c0c;
          padding: 20px;
          text-align: center;
          border-radius: 10px 10px 0 0;
          border: 4px solid #0c0c0c;
        }
        .content {
          background-color: white;
          padding: 30px;
          border: 4px solid #0c0c0c;
          border-top: none;
          border-radius: 0 0 10px 10px;
        }
        .field {
          margin-bottom: 15px;
          padding: 15px;
          background-color: #F9F2A6;
          border-radius: 10px;
          border: 2px solid #0c0c0c;
        }
        .label {
          font-weight: bold;
          color: #0F3F69;
          display: block;
          margin-bottom: 5px;
        }
        .value {
          color: #0c0c0c;
        }
        .urgent {
          background-color: #F49C44;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 Neue Kontaktanfrage eingegangen!</h1>
        </div>
        <div class="content">
          <div class="urgent">
            ⏰ Eingegangen am: ${new Date().toLocaleString('de-DE')}
          </div>
          
          <h3>Kontaktdaten:</h3>
          ${Object.entries(formData)
            .filter(([key]) => !key.includes('agb') && !key.includes('dsgvo'))
            .map(([key, value]) => `
              <div class="field">
                <span class="label">${formatFieldName(key)}:</span>
                <span class="value">${value || 'Nicht angegeben'}</span>
              </div>
            `).join('')}
          
          <h3>Rechtliche Zustimmungen:</h3>
          <div class="field">
            <span class="label">AGB akzeptiert:</span> 
            ${formData.terms ? '✅ Ja' : '❌ Nein'}
          </div>
          <div class="field">
            <span class="label">DSGVO akzeptiert:</span> 
            ${formData.privacy ? '✅ Ja' : '❌ Nein'}
          </div>
          
          <p><strong>Bitte zeitnah auf diese Anfrage reagieren!</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Formaterung der Feldnamen
const formatFieldName = (fieldName) => {
    const fieldNames = {
        vorname: 'Vorname',
        nachname: 'Nachname',
        email: 'E-Mail',
        telefon: 'Telefon',
        nachricht: 'Nachricht',
        agb: 'AGB akzeptiert',
        dsgvo: 'DSGVO akzeptiert'
    };
    return fieldNames[fieldName] || fieldName;
}

// API-Handler 
export const sendContactEmail = async (req, res) => {
    console.log("Eingangsdaten:", req.body)
    if(req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
    const formData = req.body;
    console.log("FormData:", formData); // Debugging
    
    if(!formData.email || !formData.name) {
        return res.status(400).json({ error: "Missing required fields", missingFields: ["email", "vorname"] });
    }

    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ SMTP-Verbindung erfolgreich!");

    // Bestätigung an Absender
    const confirmationMail = {
        from: `Bremerhavener Formularlotsen <${process.env.SMTP_USER}>`,
        to: formData.email,
        subject: "Vielen Dank für Ihre Kontaktanfrage",
        html: getConfirmationEmailHTML(formData)
    };
    
    // Benachrichtigung an Empfänger
    const notificationMail = {
        from: `"Kontaktformular der Formularlotsen-Webseite" <${process.env.SMTP_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: `Neue Kontaktanfrage von ${formData.name} ${formData.lastname}`,
        html: getNotificationEmailHTML(formData),
        replyTo: formData.email
    };
    
    // Mails versenden
    await Promise.all([
        transporter.sendMail(confirmationMail),
        transporter.sendMail(notificationMail)
    ]);

    console.log("✅ Beide E-Mails erfolgreich versendet!");
    
    return res.status(200).json({ 
        success: true,
        message: "Die E-Mails wurden erfolgreich versendet!" });

    } catch (error) {
        console.error("❌ Fehler beim E-Mail-Versand:", error);
        return res.status(500).json({ error:"Fehler beim E-Mail-Versand", details: error.message });
    }
}