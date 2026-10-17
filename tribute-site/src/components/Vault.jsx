const LABEL_COLORS = ['#b8402f', '#2f6aa5', '#c99a2a', '#35805f', '#7a4a8c', '#a8552e']
const TILTS = [-2, 1.5, -1, 2, -1.5, 1]

function Tape({ video, order, stageIndex }) {
  const soon = !video.url
  const style = { '--tc': LABEL_COLORS[order % LABEL_COLORS.length] }
  const inner = (
    <>
      <span className="tape-label">
        <span className="tape-band">
          {video.year}
          {soon ? ' (link coming soon)' : ''}
        </span>
        {video.thumb ? <img className="tape-thumb" src={video.thumb} alt="" loading="lazy" decoding="async" /> : null}
        <span className="tape-title">{video.title}</span>
        {!soon ? <span className="tape-play" aria-hidden="true" /> : null}
      </span>
      <span className="tape-window" aria-hidden="true">
        <i className="reel" />
        <i className="reel" />
      </span>
    </>
  )

  return (
    <li
      className="tape-item"
      data-depth="1"
      data-toss="1"
      data-lag={(0.05 + order * 0.07).toFixed(2)}
      data-r={TILTS[order % TILTS.length]}
      data-i={stageIndex}
    >
      {soon ? (
        <div className="tape soon" style={style}>
          {inner}
        </div>
      ) : (
        <a
          className="tape"
          style={style}
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${video.title} (${video.year}) on Vimeo, opens in a new tab`}
        >
          {inner}
        </a>
      )}
    </li>
  )
}

export default function Vault({ videos, stageIndex }) {
  return (
    <ul className={`tapes${videos.length <= 3 ? ' few' : ''}`} style={{ '--cols': Math.min(videos.length, 3) }}>
      {videos.map((v, i) => (
        <Tape key={`${v.title}-${i}`} video={v} order={i} stageIndex={stageIndex} />
      ))}
    </ul>
  )
}
