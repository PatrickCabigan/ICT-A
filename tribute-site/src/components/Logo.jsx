import { useState } from 'react'
import { config } from '../data/config'

// The school seal. Sits on a light disc so it stays visible on any part of the sky.
// If the image can't load, it quietly disappears instead of showing a broken icon.
export default function Logo({ className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!config.logo || failed) return null
  return (
    <span className={`seal ${className}`}>
      <img
        src={config.logo}
        alt={`${config.school} logo`}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </span>
  )
}
