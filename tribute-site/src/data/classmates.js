// The credits roll in this order. nickname and photo are optional.
// Replace these placeholders with your real classmates. Example of a finished entry:
//   { name: 'Juan Dela Cruz', nickname: 'JD', photo: '/images/cast/juan.webp' }
// Put the small square photos in public/images/cast/ (around 200px is enough).
export const classmates = Array.from({ length: 40 }, (_, i) => ({
  name: `Classmate Name ${i + 1}`,
  nickname: '',
  photo: '',
}))
