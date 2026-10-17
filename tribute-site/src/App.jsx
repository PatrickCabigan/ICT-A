import { useCallback, useEffect, useRef, useState } from 'react'
import Scenery from './components/Scenery.jsx'
import Stage from './components/Stage.jsx'
import Hud from './components/Hud.jsx'
import Lightbox from './components/Lightbox.jsx'
import { stages } from './data/stages'
import { config } from './data/config'
import { useJourney } from './hooks/useJourney'

export default function App() {
  const rootRef = useRef(null)
  const lastActive = useRef(-1)
  const [active, setActive] = useState(0)
  const [cut, setCut] = useState(0)
  const [booted, setBooted] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 3200)
    return () => clearTimeout(t)
  }, [])

  const handleActive = useCallback((i) => {
    if (lastActive.current === i) return
    if (lastActive.current !== -1) setCut((c) => c + 1)
    lastActive.current = i
    setActive(i)
  }, [])

  const goTo = useJourney({ rootRef, stages, onActive: handleActive })

  const openPhoto = useCallback((photo, slot) => setLightbox({ photo, slot }), [])
  const closePhoto = useCallback(() => setLightbox(null), [])

  // Keyboard users tabbing into an off-screen stage should bring that stage into view.
  const onFocusCapture = (e) => {
    const viewport = e.currentTarget
    viewport.scrollLeft = 0
    viewport.scrollTop = 0
    const stage = e.target.closest ? e.target.closest('[data-stage]') : null
    if (stage && e.target.matches && e.target.matches(':focus-visible')) goTo(Number(stage.dataset.stage))
  }

  return (
    <main className="journey" ref={rootRef} style={{ '--n': stages.length }}>
      <div className="viewport" onFocusCapture={onFocusCapture}>
        <Scenery />
        <div className="world" data-world>
          {stages.map((stage, i) => (
            <Stage
              key={stage.id}
              stage={stage}
              index={i}
              isActive={active === i}
              booted={booted}
              goTo={goTo}
              onOpen={openPhoto}
            />
          ))}
        </div>
        <Hud stages={stages} active={active} goTo={goTo} batch={config.batch} />
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="flicker" aria-hidden="true" />
        {cut > 0 ? <div key={cut} className="flash" aria-hidden="true" /> : null}
      </div>
      {lightbox ? <Lightbox item={lightbox} onClose={closePhoto} /> : null}
    </main>
  )
}
