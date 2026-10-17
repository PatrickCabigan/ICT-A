// Builds a scattered-polaroid layout for any number of photos (6 to 12 looks best).
// Landscape: x, y are % of the stage. Portrait phones: mx, my are used instead.
function rng(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export function scatter(count, seed) {
  const r = rng(seed * 97 + 13)
  const tier = count <= 4 ? 0 : count <= 6 ? 1 : count <= 9 ? 2 : 3

  const widthVw = [20, 17, 14.5, 12.5][tier] // photo width on landscape, in vw
  const heightCapVh = [30, 26, 23, 20][tier]
  const cols = [2, 3, 4, 5][tier]
  const rows = Math.max(1, Math.ceil(count / cols))
  const x0 = 42
  const x1 = 94
  const y0 = 12
  const y1 = 54
  const dx = cols > 1 ? (x1 - x0 - widthVw) / (cols - 1) : 0
  const dy = rows > 1 ? (y1 - y0) / (rows - 1) : 0

  const widthMobile = [32, 32, 27, 24][tier] // photo width on portrait phones, in vw
  const colsM = 3
  const rowsM = Math.max(1, Math.ceil(count / colsM))
  const dxm = (94 - widthMobile) / (colsM - 1)
  const dym = rowsM > 1 ? 28 / (rowsM - 1) : 0

  const slots = Array.from({ length: count }, (_, k) => {
    const row = Math.floor(k / cols)
    const col = k % cols
    const stagger = row % 2 === 1 ? dx * 0.35 : 0
    const x = clamp(x0 + col * dx + stagger + (r() - 0.5) * 2, x0, x1 - widthVw)
    const y = rows === 1 ? (y0 + y1) / 2 : y0 + row * dy + (r() - 0.5) * 3

    const rowM = Math.floor(k / colsM)
    const colM = k % colsM
    const staggerM = rowM % 2 === 1 ? dxm * 0.2 : 0
    const mx = clamp(3 + colM * dxm + staggerM, 3, 97 - widthMobile)
    const my = rowsM === 1 ? 52 : 42 + rowM * dym + (r() - 0.5) * 3

    const along = (x - x0) / Math.max(1, x1 - x0)
    return {
      x,
      y,
      mx,
      my,
      r: (r() * 2 - 1) * 7,
      d: 0.6 + r() * 0.6,
      lag: clamp(0.42 - along * 0.34 + (r() - 0.5) * 0.08, 0.03, 0.46),
    }
  })

  return {
    slots,
    pwl: `clamp(80px, min(${widthVw}vw, ${heightCapVh}vh), 260px)`,
    pwm: `clamp(64px, ${widthMobile}vw, 170px)`,
  }
}
