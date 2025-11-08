export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return phoneNumber;

  // Leerzeichen entfernen
  const cleanedNumber = phoneNumber.replace(/\s+/g, "");
  console.log("cleanedNumber:", cleanedNumber);

  // Prüfung ob Deutsche Nummer (mit +49 oder 0049)
  if (cleanedNumber.startsWith("+49") || cleanedNumber.startsWith("0049")) {
    const localNumber = cleanedNumber.startsWith("+49")
      ? cleanedNumber.slice(3) // +49 entfernen
      : cleanedNumber.slice(4); // 0049 entfernen
    return formatGermanNumber(`0${localNumber}`);
  }
  // Prüfung ob Internationale Nummern
  else if (cleanedNumber.startsWith("+") || cleanedNumber.startsWith("00")) {
    return formatInternationalNumber(cleanedNumber);
  }
  // Deutsche Nummer (mit 0 am Anfang)
  else if (cleanedNumber.startsWith("0")) {
    return formatGermanNumber(cleanedNumber);
  }
  // Unbekanntes Format
  else {
    return phoneNumber;
  }
};

// Deutsche Nummer Formatieren
const formatGermanNumber = (number) => {
  const cleaned = number.replace(/[^\d]/g, "");

  // Mobilfunknummer (015, 016, 017, etc.)
  if (cleaned.startsWith("01") && cleaned.length === 11) {
    return `${cleaned.substring(0, 4)} ${cleaned.substring(
      4,
      7
    )} ${cleaned.substring(7, 11)}`;
  }
  // Festnetznummer (z. B. 03012345678 → 030 123 456 78)
  else if (cleaned.startsWith("0") && cleaned.length >= 8) {
    const areaCode = cleaned.substring(0, Math.min(5, cleaned.length - 6));
    const part1 = cleaned.substring(
      areaCode.length,
      Math.min(areaCode.length + 3, cleaned.length)
    );
    const part2 = cleaned.substring(
      areaCode.length + 3,
      Math.min(areaCode.length + 6, cleaned.length)
    );
    const part3 = cleaned.substring(areaCode.length + 6);

    let formatted = areaCode;
    if (part1) formatted += ` ${part1}`;
    if (part2) formatted += ` ${part2}`;
    if (part3) formatted += ` ${part3}`;

    return formatted.trim();
  }
  // Unbekanntes Format → unverändert zurückgeben
  else {
    return number;
  }
};

// Internationale Nummer Formatieren
const formatInternationalNumber = (number) => {
  // 1. Ländercode extrahieren (nur + gefragt von Leerzeichen/Bindestrichen)
  const countryCodeMatch = number.match(/^(\+|00)(\d{1,3})/);
  console.log("countryCodeMatch:", countryCodeMatch);
  
  if (!countryCodeMatch) return number; // Kein Ländercode gefunden → unverändert zurückgeben

  const prefix = countryCodeMatch[1]; // "+" oder "00"
  const countryCode = countryCodeMatch[2]; // z. B. "1" für USA/Kanada
  console.log("countryCode:", countryCode);
  

  // 2. Rest der Nummer (ohne Ländercode) extrahieren und Sonderzeichen entfernen
  const localNumber = number
    .substring(countryCodeMatch[0].length)
    .replace(/[^\d]/g, "");

  // 3. Länderspezifische Formatierung (USA/Kanada: XXX-XXX-XXXX)
  let formattedLocalNumber = "";
  if (countryCode === "1") {
    // USA/Kanada
    // Format: XXX-XXX-XXXX (z. B. 976-490-5603)
    formattedLocalNumber = localNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1-$2-$3"
    );
  } else if (countryCode === "44") {
    // UK
    formattedLocalNumber = localNumber.replace(/(\d{4})(\d{6})/, "$1 $2");
  } else if (countryCode === "351") {
    // Portugal
    formattedLocalNumber = localNumber.replace(
      /(\d{3})(\d{3})(\d{3,4})/,
      "$1 $2 $3"
    );
  } else {
    // Standardformatierung (3er-Blöcke)
    formattedLocalNumber = localNumber.replace(/(\d{3})(?=\d)/g, "$1 ");
  }

  // 4. Ländercode + formatierte lokale Nummer zurückgeben
  return `${prefix}${countryCode} ${formattedLocalNumber}`.trim();
};
