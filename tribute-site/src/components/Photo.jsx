const pad = (n) => String(n).padStart(2, '0')

export default function Photo({ photo, slot, stageIndex, order, onOpen }) {
  const label = photo.caption || `Photo ${order + 1} from stage ${stageIndex + 1}`
  return (
    <div
      className="photo"
      data-depth={slot.d.toFixed(2)}
      data-toss="1"
      data-lag={slot.lag.toFixed(2)}
      data-r={slot.r.toFixed(1)}
      data-i={stageIndex}
      style={{
        '--x': `${slot.x.toFixed(1)}%`,
        '--y': `${slot.y.toFixed(1)}%`,
        '--mx': `${slot.mx.toFixed(1)}%`,
        '--my': `${slot.my.toFixed(1)}%`,
        '--r': `${slot.r.toFixed(1)}deg`,
      }}
    >
      <button type="button" className="photo-body" onClick={onOpen} aria-label={`Open photo: ${label}`}>
        <span className="float" style={{ '--fd': `${5 + (order % 5) * 1.1}s`, '--fl': `${order * -1.7}s` }}>
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
