import { useCallback, useEffect } from 'react'
import { hexToRgb, mix, rgbCss } from '../lib/color'

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const DARK = [8, 10, 24]

/**
 * Drives the whole journey. Vertical scroll position (native, so wheel, touch and
 * keyboard all work) becomes horizontal movement through the stages.
 */
export function useJourney({ rootRef, stages, onActive }) {
  const n = stages.length

  const goTo = useCallback(
    (i) => {
      const idx = clamp(i, 0, n - 1)
      window.scrollTo({
        top: (idx / (n - 1)) * maxScroll(),
        behavior: prefersReduced() ? 'auto' : 'smooth',
      })
    },
    [n],
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const viewport = root.querySelector('.viewport')
    const world = root.querySelector('[data-world]')
    const layers = Array.from(root.querySelectorAll('[data-layer]'))
    const depthEls = Array.from(root.querySelectorAll('[data-depth]'))
    const sun = root.querySelector('[data-sun]')
    const moon = root.querySelector('[data-moon]')
    const fill = root.querySelector('[data-progress-fill]')
    const walker = root.querySelector('[data-walker]')

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduce = mq.matches
    const onMq = () => {
      reduce = mq.matches
    }
    if (mq.addEventListener) mq.addEventListener('change', onMq)

    const palettes = stages.map((s) => s.palette.map(hexToRgb))
    let palette = palettes[0].map((c) => c.slice())
    let vw = viewport.clientWidth
    let vh = viewport.clientHeight
    let target = 0
    let pos = 0
    let active = -1
    let lastSky = ''
    let lastNight = ''

    const readTarget = () => {
      target = clamp(window.scrollY / maxScroll(), 0, 1) * (n - 1)
    }
    readTarget()
    pos = target

    const setVars = (vars) => {
      for (const key of Object.keys(vars)) root.style.setProperty(key, vars[key])
    }

    const apply = () => {
      const p = n > 1 ? pos / (n - 1) : 0

      world.style.transform = `translate3d(${-pos * vw}px,0,0)`

      for (const el of layers) {
        const tile = Number(el.dataset.tile)
        const speed = Number(el.dataset.speed)
        el.style.transform = `translate3d(${-((pos * vw * speed) % tile)}px,0,0)`
      }

      for (const el of depthEls) {
        const i = Number(el.dataset.i)
        const dd = i - pos
        if (dd > 2.2 || dd < -2.2) continue
        const d = Number(el.dataset.depth)
        let x = (d - 1) * dd * vw
        // Photos that have already passed must leave with the world, never lag behind
        // into the next stage (slow-depth photos used to drift over the next title).
        if (el.dataset.toss !== undefined && dd < 0) x = Math.min(0, x)
        let y = 0
        let rot = 0
        let scale = 1
        let opacity = 1
        if (el.dataset.toss !== undefined) {
          const lag = Number(el.dataset.lag) || 0
          const e = clamp(dd - lag, 0, 1.4)
          x += e * 0.3 * vw * d
          rot = (Number(el.dataset.r) || 0) + e * 14
          scale = 1 - e * 0.1
          opacity = 1 - clamp(e, 0, 1) * 0.92
          y = Math.sin(pos * 1.7 + i * 2.1 + lag * 9) * 6
        } else {
          opacity = (1 - clamp((dd - 0.5) / 0.6, 0, 1)) * (1 - clamp((-dd - 0.5) / 0.6, 0, 1))
        }
        el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`
        el.style.opacity = opacity.toFixed(3)
      }

      // One sun travels the whole journey, then hands over to the moon.
      const arcT = clamp(p / 0.8, 0, 1)
      const elev = Math.sin(Math.PI * arcT)
      const sunX = ((70 - 38 * p) / 100) * vw
      const sunY = ((74 - elev * 60) / 100) * vh
      const sunColor = mix([255, 150, 80], [255, 236, 190], Math.pow(elev, 0.6))
      sun.style.transform = `translate3d(${sunX.toFixed(1)}px,${sunY.toFixed(1)}px,0) translate(-50%,-50%) scale(${(1.25 - elev * 0.25).toFixed(3)})`
      sun.style.opacity = (1 - smooth(0.7, 0.8, p)).toFixed(3)
      sun.style.setProperty('--sun', rgbCss(sunColor))
      sun.style.setProperty(
        '--sun-glow',
        `rgba(${Math.round(sunColor[0])},${Math.round(sunColor[1])},${Math.round(sunColor[2])},0.42)`,
      )

      const moonT = smooth(0.74, 0.9, p)
      moon.style.opacity = moonT.toFixed(3)
      moon.style.transform = `translate3d(${(0.74 * vw).toFixed(1)}px,${(((46 - 30 * moonT) / 100) * vh).toFixed(1)}px,0) translate(-50%,-50%)`

      const night = smooth(0.6, 0.88, p).toFixed(3)
      if (night !== lastNight) {
        lastNight = night
        root.style.setProperty('--night', night)
      }

      const sky = [
        rgbCss(palette[0]),
        rgbCss(palette[1]),
        rgbCss(palette[2]),
        rgbCss(mix(palette[2], DARK, 0.58)),
        rgbCss(mix(palette[1], DARK, 0.76)),
        rgbCss(mix(palette[0], DARK, 0.88)),
      ]
      const skyKey = sky.join('|')
      if (skyKey !== lastSky) {
        lastSky = skyKey
        setVars({
          '--sky-top': sky[0],
          '--sky-mid': sky[1],
          '--sky-bot': sky[2],
          '--hill-far': sky[3],
          '--hill-mid': sky[4],
          '--hill-near': sky[5],
        })
      }

      if (fill) fill.style.transform = `scaleX(${p.toFixed(4)})`
      if (walker) walker.style.left = `${(p * 100).toFixed(3)}%`
    }

    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      const k = reduce ? 1 : 1 - Math.exp(-dt * 7)
      pos += (target - pos) * k
      if (Math.abs(target - pos) < 0.0004) pos = target

      const idx = clamp(Math.round(pos), 0, n - 1)
      if (idx !== active) {
        active = idx
        onActive(idx)
      }

      const pk = reduce ? 1 : 1 - Math.exp(-dt * 3.2)
      const goal = palettes[idx]
      palette = palette.map((c, i) => mix(c, goal[i], pk))

      apply()
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => readTarget()
    const onResize = () => {
      vw = viewport.clientWidth
      vh = viewport.clientHeight
      readTarget()
    }
    const onKey = (e) => {
      if (document.body.dataset.lock) return
      if (e.altKey || e.ctrlKey || e.metaKey) return
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      const now = Math.round(clamp(window.scrollY / maxScroll(), 0, 1) * (n - 1))
      e.preventDefault()
      goTo(e.key === 'ArrowRight' ? now + 1 : now - 1)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)

    apply()
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
      if (mq.removeEventListener) mq.removeEventListener('change', onMq)
    }
  }, [rootRef, stages, n, onActive, goTo])

  return goTo
}
