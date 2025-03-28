# 📝 Pflege der CHANGELOG.md während des Projekts
Die CHANGELOG.md dokumentiert alle relevanten Änderungen deines Projekts und hilft Entwicklern sowie Nutzern, den Fortschritt nachzuvollziehen. Ein gut gepflegtes Changelog erleichtert zudem das Debugging und Release-Management.

## 📌 Grundregeln für das Changelog
- Struktur beibehalten: Halte dich an eine konsistente Formatierung.
- Regelmäßig aktualisieren: Änderungen direkt nach dem Merge eines Features oder Fixes eintragen.
- Versionierung einhalten: Nutze Semantic Versioning (MAJOR.MINOR.PATCH).
- Klar und präzise formulieren: Schreibe Änderungen so, dass sie für andere verständlich sind.
- Änderungen in Kategorien unterteilen: Features, Bugfixes, Änderungen, Breaking Changes.

## 📌 Aufbau der CHANGELOG.md
Speichere die Datei als CHANGELOG.md im Root-Verzeichnis deines Projekts.

## 📄 Beispielstruktur für ein Changelog
```md
# 📋 Changelog

Alle relevanten Änderungen dieses Projekts werden in diesem Dokument festgehalten.

## [Unreleased]
### 🆕 Hinzugefügt
- [Backend] API-Endpunkt für Benutzerregistrierung implementiert.
- [Frontend] Design-Überarbeitung für das Dashboard.

### 🛠 Geändert
- [Backend] Verbesserte Fehlerbehandlung in der Authentifizierung.

### 🐛 Behoben
- [Frontend] Button-Fehlfunktion auf der Startseite korrigiert.
- [Backend] Datenbank-Timeout-Probleme bei großen Anfragen behoben.

---

## [1.0.0] - 2024-03-01  
### 🎉 Erstveröffentlichung  
- Initiales Backend mit Node.js und MongoDB.  
- Grundlegende API-Endpunkte für Songs hinzugefügt.  
- Einfaches Frontend mit Material-UI und React erstellt.
```
<hr/>

## 📌 Wie pflegst du das Changelog während der Arbeit?
### 🔄 1. Während der Entwicklung (im Unreleased-Bereich)
- Notiere Änderungen, sobald du eine neue Funktion entwickelst oder Bugs fixst.
- Nutze Kategorien wie Hinzugefügt, Geändert, Behoben, Entfernt, Breaking Changes.
- Beispiel:
```md
## [Unreleased]
### 🆕 Hinzugefügt
- [Backend] API für Song-Vorschläge erweitert.
```

### 🚀 2. Vor einem Release (Neue Version eintragen & Unreleased leeren)
- Sobald eine Version fertig ist, verschiebe die Unreleased-Einträge in eine neue Version.
- Ergänze das Veröffentlichungsdatum.
- Beispiel:

```md
## [1.1.0] - 2024-03-10
### 🆕 Hinzugefügt
- [Backend] API für Song-Vorschläge erweitert.
```

### 📌 3. Nach jedem Merge in main oder release-Branch
- Falls der Merge neue Features enthält, überprüfe, ob das Changelog angepasst wurde.
- Falls notwendig, füge eine Merge-Commit-Notiz hinzu:

```sh
git commit -m "Update CHANGELOG.md für Version 1.1.0"
```

### ⏳ 4. Versionsnummern & Tags auf GitHub setzen
- Nutze Git Tags, um Versionen zu markieren:

```sh
git tag -a v1.1.0 -m "Release 1.1.0"
git push origin v1.1.0
```

## 📌 Best Practices für das Changelog
#### ✅ DO:
- ✔ Regelmäßig aktualisieren.
- ✔ Klar und verständlich formulieren.
- ✔ Änderungen sinnvoll gruppieren.
- ✔ Breaking Changes extra hervorheben.

#### ❌ DON'T:
- ✖ Unnötige technische Details aufnehmen.
- ✖ Zu allgemeine Beschreibungen wie "Diverse Bugfixes".
- ✖ Änderungen vergessen oder erst am Release-Tag hinzufügen.