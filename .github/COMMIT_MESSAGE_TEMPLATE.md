# 📌 Best Practices für Commits in Git
Die Anzahl der Commits in einer Branch hängt davon ab, wie umfangreich die Änderungen sind. Grundsätzlich gilt:
- Jeder Commit sollte eine abgeschlossene, funktionierende Änderung darstellen.
- Kleine, logische Schritte sind besser als riesige Commits mit 1000+ Zeilen Code.

## ✅ Wie viele Commits pro Branch?
"feature/header-component" -> Empfohlene Commit-Anzahl:3–10 -> Beispiel:	
1. "Add header component structure"
2. "Style header with Mantine"
3. "Add responsiveness for mobile"

"bugfix/fix-login-error" Empfohlene Commit-Anzahl: 1–5 -> Beispiel:
1. "Fix login validation bug"
2. "Improve error messages for failed login"


"hotfix/security-patch" -> Empfohlene Commit-Anzahl 1–3 -> Beispiel:
1. "Patch security issue with JWT tokens"

"release/v1.2.0" -> Empfohlene Commit-Anzahl: 1–5 (nur Fixes)-> Beispiel:
1. "Fix last-minute UI glitches"


## 🔥 Wie kleinteilig sollten Commits sein?
- **NICHT zu groß**: "Add complete homepage" (❌ zu allgemein, schwer nachzuvollziehen)

- **NICHT zu klein**: "Add one div to header" (❌ unnötig granular)

- **GENAU RICHTIG**:
  - ✅ "Add header component with basic layout"
  - ✅ "Integrate header navigation links"
  - ✅ "Improve header responsiveness for mobile"

**Faustregel**: Ein Commit sollte eine einzige, abgeschlossene Änderung enthalten, die man leicht erklären kann.

## ✍️ Wie sollten Commit-Nachrichten formuliert sein?
Commit-Nachrichten sollten kurz, prägnant und im Imperativ geschrieben sein.

#### ✅ Gute Commit-Messages:

- "Add login form validation"

- "Fix header alignment on mobile"

- "Optimize WebSocket performance"

#### ❌ Schlechte Commit-Messages:

- "Ich habe den Header gemacht" (❌ Kein Imperativ, zu persönlich)

- "fixed stuff" (❌ Unklar)

- "asdfjkl" (❌ Absolut nutzlos 😂)

## 💡 Empfohlene Commit-Struktur
Ein guter Commit besteht aus:
- 1️⃣ Kurze, prägnante Überschrift (50 Zeichen max)
- 2️⃣ (Optional) Erklärung im Body (wenn nötig)
- 3️⃣ Referenz zu einer Issue oder einem Ticket (falls vorhanden)

Beispiel für eine ausführlichere Commit-Message:

```bash
"[🐛 bugfix]: Fix login bug when using Safari"

"- Adjust token expiration handling
- Improve error messages for failed logins
- Closes #42"
```

## 🏁 Zusammenfassung
Best Practice    |    ✅ Richtig    |    ❌ Falsch
Commit-Größe    |    Logische, abgeschlossene Änderung    |    Riesige oder winzige Commits
Commit-Nachricht    |    "Fix login validation"    |    "fixed bug"
Commit-Stil    |    Imperativ ("Add", "Fix", "Improve")    |    Vergangenheit ("Habe das gemacht")
Anzahl Commits pro Feature    |    3–10    |    1 Riesen-Commit oder 50 Kleinst-Commits

### 🎯 Merke:
- Lieber mehrere kleine, aussagekräftige Commits als einen riesigen "Monster-Commit".

- Schreibe Commit-Nachrichten so, dass jemand anderes (oder dein zukünftiges Ich 😅) sofort versteht, was geändert wurde.

## 🙂 Emojis

Emoji    |    Kategorie    |    Beispiel
🎨    |    Feature    |    [🎨 feature]:Add color picker tool
🐛    |    Bugfix    |    [🐛 bugfix]: Fix socket.io connection issue
⚡    |    Performance    |    [⚡ performance]: Improve canvas rendering speed
🔧    |    Refactoring    |    [🔧 refactoring]: Refactor user authentication
📝    |    Docs    |    [📝 docs]: Update README with setup instructions