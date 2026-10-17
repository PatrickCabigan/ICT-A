# Batch tribute site

A horizontal, 14-stage journey through Grade 11 and 12 (2022 to 2024). One sun rises at the
start and sets over the course of the trip, the sky changes at every stage, and the final
stages hold the video tributes (Vimeo links), special mentions, and the credits roll with
everyone's name and photo.

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
| Section name, school, logo, final message, sign-off | `src/data/config.js` |
| Stage titles, text, dates, colors, photos | `src/data/stages.js` |
| Vimeo tributes (one for Grade 11, one for Grade 12) | `src/data/videos.js` |
| Special mentions (adviser, teachers, helpers) | `src/data/mentions.js` |
| Classmates for the credits (name, nickname, photo) | `src/data/classmates.js` |
| Easter egg credit (your name and GitHub link) | `creator` in `src/data/config.js` |

## School logo

The logo (set in `config.logo`) shows on the opening screen and in the top bar. It sits on a light
disc so it stays visible on any sky color. For reliability, download it into `public/images/` and
set `logo: '/images/logo.png'` instead of using the GitHub link.

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

Use as many photos per stage as you like. The layout scatters them automatically and shrinks
them as the count grows (6 to 12 per stage looks best). Click any photo to open it, then use
Previous/Next (or the arrow keys, or swipe) to browse the whole stage.

Full URLs also work, but files in `public/images` load faster on Vercel.

## Cast photos

Put small square photos (around 200px) in `public/images/cast/` and list each classmate in
`src/data/classmates.js`:

```js
{ name: 'Juan Dela Cruz', nickname: 'JD', photo: '/images/cast/juan.webp' },
```

## Easter egg

Press **REC** at the top-left of the screen to open a clapperboard that credits whoever built
the site, with a link to their GitHub. Set your name and link in `creator` inside
`src/data/config.js`. The credits at the very end also drop a hint about it.

## Adding videos

In `src/data/videos.js`, set `url` to the Vimeo link for each tribute. Clicking a tape opens it
in a new tab. Leave `url` empty to show "link coming soon".

## Notes

- Scroll, swipe, arrow keys, or the progress bar all move through the stages.
- Respects "reduce motion" system settings (animations are switched off, credits become scrollable).
- All text in the data files is placeholder copy. Rewrite it in your own words.
