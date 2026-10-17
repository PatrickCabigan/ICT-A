import { useMemo } from 'react'

const TILE = 1600
const H = 300
const TILES = 4

function rng(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

// Rolling hills. Integer wave counts make the tile repeat without a seam.
function hillsMarkup(seed, base, waves) {
  const r = rng(seed)
  const parts = waves.map(([k, a]) => ({ k, a, phase: r() * Math.PI * 2 }))
  let d = ''
  for (let x = 0; x <= TILE; x += 20) {
    let y = base
    for (const w of parts) y += w.a * Math.sin((2 * Math.PI * w.k * x) / TILE + w.phase)
    d += `${x === 0 ? 'M' : 'L'}${x},${y.toFixed(1)} `
  }
  d += `L${TILE},${H} L0,${H} Z`
  return `<path d="${d}" fill="currentColor"/>`
}

// A small-town skyline. Only the lit windows are drawn; they glow once night falls.
function skylineMarkup(seed) {
  const r = rng(seed)
  let out = ''
  let x = 24
  while (x < TILE - 140) {
    const w = 46 + r() * 70
    const h = 70 + r() * 170
    out += `<rect x="${x.toFixed(1)}" y="${(H - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="currentColor"/>`
    for (let wx = x + 8; wx < x + w - 10; wx += 14) {
      for (let wy = H - h + 12; wy < H - 14; wy += 18) {
        if (r() < 0.28) out += `<rect class="win" x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="5" height="7"/>`
      }
    }
    x += w + r() * 14
  }
  return out
}

// A row of pine trees for the foreground.
function treesMarkup(seed) {
  const r = rng(seed)
  let out = `<rect x="0" y="${H - 16}" width="${TILE}" height="16" fill="currentColor"/>`
  let x = 0
  while (x < TILE) {
    const w = 30 + r() * 50
    const h = 80 + r() * 120
    out += `<polygon points="${x.toFixed(1)},${H - 8} ${(x + w / 2).toFixed(1)},${(H - h).toFixed(1)} ${(x + w).toFixed(1)},${H - 8}" fill="currentColor"/>`
    x += w * 0.62
  }
  return out
}

function Layer({ kind, speed, markup }) {
  return (
    <div className={`layer layer-${kind}`} data-layer data-speed={speed} data-tile={TILE}>
      {Array.from({ length: TILES }).map((_, i) => (
        <svg
          key={i}
          viewBox={`0 0 ${TILE} ${H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      ))}
    </div>
  )
}

export default function Scenery() {
  const far = useMemo(() => hillsMarkup(11, 112, [[2, 34], [3, 18], [5, 9]]), [])
  const mid = useMemo(() => skylineMarkup(23), [])
  const near = useMemo(() => treesMarkup(37), [])
  const stars = useMemo(() => {
    const r = rng(7)
    return Array.from({ length: 80 }, () => ({
      x: r() * 100,
      y: r() * 52,
      size: r() < 0.15 ? 3 : r() < 0.5 ? 2 : 1,
      delay: r() * 4,
      dur: 2 + r() * 3,
    }))
  }, [])

  return (
    <div className="scenery" aria-hidden="true">
      <div className="stars">
        {stars.map((s, i) => (
          <i
            key={i}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>
      <div className="sun" data-sun />
      <div className="moon" data-moon />
      <Layer kind="far" speed={0.1} markup={far} />
      <Layer kind="mid" speed={0.22} markup={mid} />
      <Layer kind="near" speed={0.45} markup={near} />
    </div>
  )
}
