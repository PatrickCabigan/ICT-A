import Photo from './Photo.jsx'
import Vault from './Vault.jsx'
import Credits from './Credits.jsx'
import Mentions from './Mentions.jsx'
import Logo from './Logo.jsx'
import { config } from '../data/config'
import { videos } from '../data/videos'
import { classmates } from '../data/classmates'
import { mentions } from '../data/mentions'
import { scatter } from '../lib/layout'

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
  const layout = scatter(stage.photos.length, index + 1)
  const list = stage.photos.map((photo, k) => ({ photo, r: layout.slots[k].r }))
  const photos = stage.photos.map((photo, k) => (
    <Photo
      key={k}
      photo={photo}
      slot={layout.slots[k]}
      stageIndex={index}
      order={k}
      onOpen={() => onOpen(list, k)}
    />
  ))

  const style = {
    '--delay': index === 0 && !booted ? '1.6s' : '0.1s',
    '--p-top': stage.palette[0],
    '--p-mid': stage.palette[1],
    '--p-bot': stage.palette[2],
    '--pwl': layout.pwl,
    '--pwm': layout.pwm,
  }

  let body
  switch (stage.kind) {
    case 'intro':
      body = (
        <div className="stage-text" data-depth="0.9" data-i={index}>
          <Logo className="seal-lg" />
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
    case 'mentions':
      body = (
        <>
          <div className="stage-text" data-depth="0.86" data-i={index}>
            <Title text={stage.title} />
            <Copy lines={stage.copy} />
          </div>
          <Mentions people={mentions} stageIndex={index} />
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
