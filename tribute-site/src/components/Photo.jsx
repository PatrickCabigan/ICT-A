const pad = (n) => String(n).padStart(2, '0')

export default function Photo({ photo, slot, stageIndex, order, onOpen }) {
  const label = photo.caption || `Photo ${order + 1} from stage ${stageIndex + 1}`
  return (
    <div
      className="photo"
      data-depth={slot.d}
      data-toss="1"
      data-lag={slot.lag}
      data-r={slot.r}
      data-i={stageIndex}
      style={{ '--x': `${slot.x}%`, '--y': `${slot.y}%`, '--mx': `${slot.mx}%`, '--my': `${slot.my}%`, '--r': `${slot.r}deg` }}
    >
      <button type="button" className="photo-body" onClick={() => onOpen(photo, slot)} aria-label={`Open photo: ${label}`}>
        <span className="float" style={{ '--fd': `${5 + order * 1.3}s`, '--fl': `${order * -1.7}s` }}>
          <span className="polaroid">
            <span className="frame">
              {photo.src ? (
                <img src={photo.src} alt={photo.alt || photo.caption || ''} loading="lazy" decoding="async" draggable="false" />
              ) : (
                <span className="placeholder">
                  <span className="ph-label">Your photo here</span>
                  <span className="ph-code">
                    {pad(stageIndex + 1)}-{order + 1}
                  </span>
                </span>
              )}
            </span>
            <span className="cap">{photo.caption}</span>
          </span>
        </span>
      </button>
    </div>
  )
}
