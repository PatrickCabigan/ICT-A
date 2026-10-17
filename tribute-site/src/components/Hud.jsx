import Walker from './Walker.jsx'

export default function Hud({ stages, active, goTo, batch }) {
  const n = stages.length
  const stage = stages[active]

  return (
    <>
      <header className="bar bar-top">
        <div className="hud-group">
          <span className="rec">
            <i className="rec-dot" aria-hidden="true" />
            REC
          </span>
          <span className="stamp">{stage.date}</span>
        </div>
        <div className="hud-mid">{batch}</div>
        <div className="hud-group hud-end">
          Stage {active + 1} of {n}
        </div>
      </header>

      <footer className="bar bar-bottom">
        <nav className="progress" aria-label="Journey stages">
          <div className="rail">
            <div className="track">
              <div className="track-fill" data-progress-fill />
            </div>
            {stages.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`notch${i <= active ? ' on' : ''}`}
                style={{ left: `${(i / (n - 1)) * 100}%` }}
                onClick={() => goTo(i)}
                aria-label={`Go to stage ${i + 1}: ${s.title}`}
                aria-current={i === active ? 'step' : undefined}
                title={`${i + 1}. ${s.title}`}
              />
            ))}
            <div className="walker" data-walker aria-hidden="true">
              <Walker />
            </div>
          </div>
        </nav>
      </footer>
    </>
  )
}
