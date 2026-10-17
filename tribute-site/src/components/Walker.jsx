// A tiny pixel graduate that walks along the progress rail.
const BODY = [
  'kkkkkkky',
  '.kkkkkky',
  '..ssss..',
  '..esse..',
  '..ssss..',
  '.gggggg.',
  'sggggggs',
  '.gggggg.',
  '.gggggg.',
  '..gggg..',
]
const LEGS_A = ['.kk..kk.', '.kk..kk.']
const LEGS_B = ['..kkkk..', '..kkkk..']

const COLORS = { k: '#0b0b0b', s: '#e8b98a', e: '#1a1a1a', g: '#8f2d2d', y: '#e4b73c' }

function Rows({ rows, offset = 0 }) {
  const rects = []
  rows.forEach((row, y) => {
    Array.from(row).forEach((c, x) => {
      if (c !== '.') rects.push(<rect key={`${x}-${y}`} x={x} y={y + offset} width="1" height="1" fill={COLORS[c]} />)
    })
  })
  return <>{rects}</>
}

export default function Walker() {
  return (
    <svg viewBox="0 0 8 12" width="18" height="27" shapeRendering="crispEdges" focusable="false" aria-hidden="true">
      <Rows rows={BODY} />
      <g className="legs-a">
        <Rows rows={LEGS_A} offset={10} />
      </g>
      <g className="legs-b">
        <Rows rows={LEGS_B} offset={10} />
      </g>
    </svg>
  )
}
