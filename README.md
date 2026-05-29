# Shine-K — AI Industrial Safety Platform

An AI(AX)-powered industrial safety platform for small & medium manufacturers, built for the
**KW·AI 산업안전 플랫폼 개발 경진대회** (Kyungwoon University). It reuses existing infrastructure
(CCTV, microphones, smartphones, IoT) to predict both **Accident Hazards** (real-time: caught-in,
falls, explosion, leaks) and **Cumulative Hazards** (long-term worker health), shifting safety from a
punitive model to a predictive one.

## Highlights
- **Trilingual**: English · 中文 · 한국어 (auto-detected, switchable, persisted).
- **Runs everywhere**: zero external dependencies — no CDN, no web fonts, no tracking. Works on every
  desktop / tablet / mobile browser worldwide, including Huawei & Xiaomi devices where Google services
  may be blocked.
- **Light, accessible theme**; fully responsive (360px → desktop).
- **Live simulated control room**: site safety gauge, AI risk-prediction chart, zone monitor, live
  event feed, workforce-health donut, ROI calculator, and a Gyeongbuk cluster map — all hand-rolled in SVG.

## Files
| File | Purpose |
|------|---------|
| `index.html` | Page structure & sections |
| `styles.css` | Light theme, responsive layout |
| `i18n.js` | EN / ZH / KO dictionary + dynamic data |
| `app.js` | i18n switch, counters, SVG charts, dashboard simulation, ROI |

## Run locally
Open `index.html` directly, or serve the folder:
```bash
python -m http.server 8080
```

> Dashboard figures are a simulated demonstration for the platform competition.
