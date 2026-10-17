import { config } from '../data/config'

export default function Credits({ people, isActive }) {
  const duration = 16 + people.length * 1.4

  return (
    <div className={`credits${isActive ? ' run' : ''}`} style={{ '--dur': `${duration}s` }}>
      <div className="roll">
        <h2 className="credits-title">The Cast</h2>
        <p className="credits-sub">
          {config.sectionName}, batch {config.batch}
        </p>
        <ul className="cast">
          {people.map((p, i) => (
            <li key={`${p.name}-${i}`} className="cast-row">
              {p.photo ? <img src={p.photo} alt="" loading="lazy" decoding="async" /> : null}
              <span className="cast-name">{p.name}</span>
              {p.nickname ? <span className="cast-nick">{p.nickname}</span> : null}
            </li>
          ))}
        </ul>
        <p className="credits-thanks">Thank you for every day of it.</p>
      </div>
      <div className="endcard">
        <p>The end.</p>
        <p>Or maybe the beginning.</p>
      </div>
    </div>
  )
}
