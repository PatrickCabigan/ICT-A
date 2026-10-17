import { useEffect, useRef } from 'react'

export default function Lightbox({ item, onClose }) {
  const wrapRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    const wrap = wrapRef.current
    document.body.dataset.lock = '1'
    if (closeRef.current) closeRef.current.focus()

    const stop = (e) => e.preventDefault()
    wrap.addEventListener('wheel', stop, { passive: false })
    wrap.addEventListener('touchmove', stop, { passive: false })

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        e.preventDefault()
        if (closeRef.current) closeRef.current.focus()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      delete document.body.dataset.lock
      wrap.removeEventListener('wheel', stop)
      wrap.removeEventListener('touchmove', stop)
      window.removeEventListener('keydown', onKey)
      if (previous && previous.focus) previous.focus({ preventScroll: true })
    }
  }, [onClose])

  const { photo, slot } = item

  return (
    <div
      className="lightbox"
      ref={wrapRef}
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption || 'Photo'}
      onClick={onClose}
    >
      <figure className="lb-card" style={{ '--r': `${slot.r}deg` }} onClick={(e) => e.stopPropagation()}>
        {photo.src ? (
          <img src={photo.src} alt={photo.alt || photo.caption || ''} draggable="false" />
        ) : (
          <div className="lb-placeholder">Your photo here</div>
        )}
        {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
      </figure>
      <button type="button" className="lb-close" ref={closeRef} onClick={onClose}>
        Close
      </button>
    </div>
  )
}
