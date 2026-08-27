# SpeakSmart — SLW Academy

Website for topic generation and enhancement of speech, plus the SLW Academy structured program platform.

---

## Architecture Overview

SpeakSmart is designed in two layers:

### Layer 1 — Public Free Toolkit (no login required)
Open to all visitors. No login, no barrier.

| Tool | Description |
|------|-------------|
| 🏷️ Speech Title Generator | Redirects to an AI title-generation tool |
| 📝 Speech Outline Generator | Generates structured speech outlines by type |
| 🎲 Impromptu Topic Generator | Random speaking prompts by age group |
| 📖 Word of the Day | Vocabulary builder with definitions and examples |
| 😄 Joke of the Day | Clean, age-appropriate humor |
| 💬 Quote of the Day | Inspiring quotes across 6 topics |
| 🎯 Spin Wheel | Random name picker for classroom use |

### Layer 2 — Academy Platform (MVP)
Structured student and club platform for real academy operations.

| Feature | Description |
|---------|-------------|
| 🎓 Programs | Level 1–3 programs, Workshops, 1:1 Coaching |
| 🏫 Clubs | School, Community, Partner, Online clubs |
| 📊 Dashboard | Admin + Student dashboards |
| 🏆 Competitions | Placeholder for future competition features |

#### Dashboard Access
- **Admin**: Passcode `SLW-ADMIN-2026` (change in Settings after first login)
- **Student**: Batch/Club Code + Username (`FirstName-SLW-Year`, e.g. `Aarav-SLW-2026`)

#### Admin Capabilities
- Create programs and clubs with unique access codes
- Add student rosters
- Create sessions (date, speech slots, roles)
- Open/close role signup per session
- Enter rubric scores (0–100)
- View leaderboards (by speeches, avg score, role participation)
- Change admin passcode

#### Student Capabilities
- Sign in with batch/club code + username
- Claim speech slots for upcoming sessions (one per session)
- Enter speech title
- Sign up for session roles
- View upcoming sessions
- View personal speech history and scores
- View leaderboard

#### Session Roles
Quote of the Day · Word of the Day · Joke of the Day · Impromptu Speech Master · Timer · Evaluator · Grammarian

---

## Data Persistence

All data is stored in browser `localStorage`. No external database is required for the MVP.

---

## MVP Limitations

- Authentication is passcode-based (not OAuth/JWT) — suitable for MVP use
- Data is per-browser (localStorage); for multi-device access, a backend will be needed in future
- Competitions tab is a placeholder; full implementation is planned for a future release
- No certificate generation or live scoreboards yet

---

## Tech Stack

Single-page application — plain HTML, CSS, and JavaScript with no external dependencies.

Built by SLW Technology Intern · SLW Academy Digital Intern 2026 · [speakleadwinacademy.com](https://speakleadwinacademy.com)
