import { useCallback, useEffect, useRef, useState } from 'react'
import { useModal } from '../hooks/useModal'

export default function Lightbox({ item, onClose }) {
  const wrapRef = useRef(null)
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const [index, setIndex] = useState(item.index)
  const [moved, setMoved] = useState(false)
  const count = item.list.length

  const go = useCallback(
    (step) => {
      setMoved(true)
      setIndex((i) => (i + step + count) % count)
    },
    [count],
  )

  useModal(wrapRef, onClose, closeRef)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const { photo, r } = item.list[index]

  return (
    <div
      className="lightbox"
      ref={wrapRef}
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption || 'Photo'}
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null || count < 2) return
        const delta = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1)
      }}
    >
      <figure
        key={index}
        className={`lb-card${moved ? ' quick' : ''}`}
        style={{ '--r': `${r}deg` }}
        onClick={(e) => e.stopPropagation()}
      >
        {photo.src ? (
          <img src={photo.src} alt={photo.alt || photo.caption || ''} draggable="false" />
        ) : (
          <div className="lb-placeholder">Your photo here</div>
        )}
        {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
      </figure>

      <div className="lb-controls" onClick={(e) => e.stopPropagation()}>
        {count > 1 ? (
          <button type="button" className="lb-nav" onClick={() => go(-1)}>
            Previous
          </button>
        ) : null}
        {count > 1 ? (
          <span className="lb-count">
            {index + 1} of {count}
          </span>
        ) : null}
        {count > 1 ? (
          <button type="button" className="lb-nav" onClick={() => go(1)}>
            Next
          </button>
        ) : null}
      </div>

      <button type="button" className="lb-close" ref={closeRef} onClick={onClose}>
        Close
      </button>
    </div>
  )
}
