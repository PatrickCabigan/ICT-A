const TILTS = [-1.5, 1, -0.8, 1.6, -1.2, 0.8, -1.6, 1.2]

function Initial({ name }) {
  return <span className="mention-initial">{name.trim().charAt(0)}</span>
}

export default function Mentions({ people, stageIndex }) {
  return (
    <ul className="mentions">
      {people.map((p, i) => (
        <li
          key={`${p.name}-${i}`}
          className="mention"
          data-depth="1"
          data-toss="1"
          data-lag={(0.05 + i * 0.06).toFixed(2)}
          data-r={TILTS[i % TILTS.length]}
          data-i={stageIndex}
        >
          <div className="mention-card">
            <span className="mention-photo">
              {p.photo ? <img src={p.photo} alt="" loading="lazy" decoding="async" /> : <Initial name={p.name} />}
            </span>
            <span className="mention-text">
              <span className="mention-role">{p.role}</span>
              <span className="mention-name">{p.name}</span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
