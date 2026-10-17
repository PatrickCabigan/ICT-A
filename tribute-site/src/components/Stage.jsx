import Photo from './Photo.jsx'
import Vault from './Vault.jsx'
import Credits from './Credits.jsx'
import { config } from '../data/config'
import { videos } from '../data/videos'
import { classmates } from '../data/classmates'

// x, y: position on landscape screens (% of stage). mx, my: position on portrait phones.
// d: depth (parallax speed). lag: how early the photo settles. r: tilt in degrees.
const SLOTS = {
  a: [
    { x: 42, y: 16, mx: 5, my: 44, r: -5, d: 0.78, lag: 0.1 },
    { x: 66, y: 30, mx: 50, my: 48, r: 4, d: 1.15, lag: 0.25 },
    { x: 50, y: 52, mx: 27, my: 66, r: -2, d: 0.62, lag: 0.4 },
  ],
  b: [
    { x: 60, y: 14, mx: 50, my: 44, r: 3, d: 0.7, lag: 0.1 },
    { x: 40, y: 36, mx: 8, my: 50, r: -4, d: 0.55, lag: 0.3 },
    { x: 72, y: 46, mx: 30, my: 66, r: 6, d: 1.2, lag: 0.4 },
  ],
  c: [
    { x: 44, y: 14, mx: 6, my: 46, r: -3, d: 0.9, lag: 0.1 },
    { x: 70, y: 20, mx: 52, my: 46, r: 5, d: 1.2, lag: 0.28 },
    { x: 58, y: 50, mx: 28, my: 66, r: 2, d: 0.6, lag: 0.42 },
  ],
}

function Title({ text }) {
  return (
    <h2 className="title" aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i}>
          <span className="word" style={{ '--i': i }} aria-hidden="true">
            {word}
          </span>{' '}
        </span>
      ))}
    </h2>
  )
}

function Copy({ lines }) {
  if (!lines.length) return null
  return (
    <div className="copy">
      {lines.map((line, j) => (
        <p key={j} style={{ '--j': j }}>
          <span>{line}</span>
        </p>
      ))}
    </div>
  )
}

const SPARKS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2
  const dist = i % 2 === 0 ? 150 : 95
  return { x: Math.round(Math.cos(angle) * dist), y: Math.round(Math.sin(angle) * dist) }
})

export default function Stage({ stage, index, isActive, booted, goTo, onOpen }) {
  const slots = SLOTS[stage.layout] || SLOTS.a
  const photos = stage.photos.map((photo, k) => (
    <Photo key={k} photo={photo} slot={slots[k % slots.length]} stageIndex={index} order={k} onOpen={onOpen} />
  ))

  const style = {
    '--delay': index === 0 && !booted ? '1.6s' : '0.1s',
    '--p-top': stage.palette[0],
    '--p-mid': stage.palette[1],
    '--p-bot': stage.palette[2],
  }

  let body
  switch (stage.kind) {
    case 'intro':
      body = (
        <div className="stage-text" data-depth="0.9" data-i={index}>
          <Title text={stage.title} />
          <div className="copy">
            <p style={{ '--j': 0 }}>
              <span>
                {config.strand}, {config.batch}
              </span>
            </p>
            <p style={{ '--j': 1 }}>
              <span>{config.school}</span>
            </p>
          </div>
          <button type="button" className="cta" onClick={() => goTo(1)}>
            Start the journey
          </button>
          <p className="hint">Scroll, swipe, or press the arrow keys to move.</p>
        </div>
      )
      break
    case 'levelup':
      body = (
        <div className="stage-text" data-depth="0.9" data-i={index}>
          <div className="lvl" role="img" aria-label="Grade 11 becomes Grade 12">
            <span className="lvl-lab">Grade</span>
            <span className="lvl-num">
              <span className="lvl-a">11</span>
              <span className="lvl-b">12</span>
            </span>
            <span className="sparks">
              {SPARKS.map((s, i) => (
                <i key={i} style={{ '--sx': `${s.x}px`, '--sy': `${s.y}px` }} />
              ))}
            </span>
          </div>
          <Title text={stage.title} />
          <Copy lines={stage.copy} />
        </div>
      )
      break
    case 'graduation':
      body = (
        <>
          <div className="stage-text" data-depth="0.86" data-i={index}>
            <Title text={stage.title} />
          </div>
          <div className="letter" data-depth="0.9" data-i={index}>
            {config.finalMessage.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <p className="sign">{config.signOff}</p>
          </div>
          {photos}
        </>
      )
      break
    case 'vault':
      body = (
        <>
          <div className="stage-text" data-depth="0.86" data-i={index}>
            <Title text={stage.title} />
            <Copy lines={stage.copy} />
          </div>
          <Vault videos={videos} stageIndex={index} />
        </>
      )
      break
    case 'credits':
      body = <Credits people={classmates} isActive={isActive} />
      break
    default:
      body = (
        <>
          <div className="stage-text" data-depth="0.86" data-i={index}>
            <Title text={stage.title} />
            <Copy lines={stage.copy} />
          </div>
          {photos}
        </>
      )
  }

  return (
    <section
      className={`stage${isActive ? ' is-active' : ''}`}
      data-stage={index}
      data-kind={stage.kind}
      aria-label={stage.title}
      style={style}
    >
      {body}
    </section>
  )
}
