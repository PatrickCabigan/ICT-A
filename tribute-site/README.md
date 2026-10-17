# Batch tribute site

A horizontal, ten-stage journey through Grade 11 and 12 (2022 to 2024). One sun rises at the
start and sets over the course of the trip, the sky changes at every stage, and the last two
stages hold the video tributes (Vimeo links) and the credits roll with everyone's names.

Frontend only. React + Vite, no other dependencies.

## Run it (GitHub Codespaces)

```bash
npm install
npm run dev
```

Codespaces will offer to open the forwarded port. Then deploy: push to GitHub, import the repo
in Vercel, and keep the defaults (Framework: Vite, build `npm run build`, output `dist`).

## Where to edit things

| What | File |
|---|---|
| Section name, school, final message, sign-off | `src/data/config.js` |
| Stage titles, text, dates, colors, photos | `src/data/stages.js` |
| Vimeo tributes (title, year, link) | `src/data/videos.js` |
| Classmate names for the credits | `src/data/classmates.js` |

## Adding photos

1. Put images in `public/images/` (compressed WebP or JPG, around 1200px wide is plenty).
2. In `src/data/stages.js`, replace `blank(3)` for a stage with:

```js
photos: [
  { src: '/images/g11-day-one-1.webp', caption: 'Front row, first week' },
  { src: '/images/g11-day-one-2.webp', caption: '' },
  { src: '/images/g11-day-one-3.webp', caption: '' },
],
```

Full URLs also work, but files in `public/images` load faster on Vercel.

## Adding videos

In `src/data/videos.js`, set `url` to the Vimeo link. Clicking a tape opens it in a new tab.
Leave `url` empty to show "link coming soon". Four to eight tapes fit best.

## Notes

- Scroll, swipe, arrow keys, or the progress bar all move through the stages.
- Respects "reduce motion" system settings (animations are switched off, credits become scrollable).
- All text in the data files is placeholder copy. Rewrite it in your own words.
