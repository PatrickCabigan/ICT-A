import { useRef } from 'react'
import { useModal } from '../hooks/useModal'
import { config } from '../data/config'

// The easter egg: a clapperboard that credits whoever built the site.
export default function Slate({ onClose }) {
  const wrapRef = useRef(null)
  const closeRef = useRef(null)
  useModal(wrapRef, onClose, closeRef)
  const { creator } = config

  return (
    <div
      className="lightbox"
      ref={wrapRef}
      role="dialog"
      aria-modal="true"
      aria-label="Who made this site"
      onClick={onClose}
    >
      <div className="slate" onClick={(e) => e.stopPropagation()}>
        <div className="slate-clap" aria-hidden="true" />
        <dl className="slate-body">
          <div>
            <dt>Production</dt>
            <dd>{config.sectionName}, a tribute</dd>
          </div>
          <div>
            <dt>Directed and built by</dt>
            <dd>{creator.name}</dd>
          </div>
          <div>
            <dt>Roll</dt>
            <dd>Batch {config.batch}</dd>
          </div>
          <div>
            <dt>Behind the scenes</dt>
            <dd>
              <a href={creator.github} target="_blank" rel="noopener noreferrer">
                {creator.githubLabel}
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <button type="button" className="lb-close" ref={closeRef} onClick={onClose}>
        Close
      </button>
    </div>
  )
}
