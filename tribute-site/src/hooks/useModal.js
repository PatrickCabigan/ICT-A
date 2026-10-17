import { useEffect } from 'react'

// Shared behaviour for overlays: locks the journey, traps focus, closes on Escape.
export function useModal(wrapRef, onClose, initialFocusRef) {
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return undefined
    const previous = document.activeElement
    document.body.dataset.lock = '1'
    if (initialFocusRef && initialFocusRef.current) initialFocusRef.current.focus()

    const stop = (e) => e.preventDefault()
    wrap.addEventListener('wheel', stop, { passive: false })
    wrap.addEventListener('touchmove', stop, { passive: false })

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const els = Array.from(wrap.querySelectorAll('button, a[href]'))
      if (!els.length) return
      const first = els[0]
      const last = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
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
  }, [wrapRef, onClose, initialFocusRef])
}
