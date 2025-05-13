// components/SubtleBackground.tsx

import '../styles/SubtleBackground.css'

// SubtleBackground.tsx
const SubtleBackground = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: -1,
    }}
  >
    <svg
      viewBox="0 0 1080 600"
      xmlns="http://www.w3.org/2000/svg"
      className="koru-outline"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '100%' }}
    >
      <path
        d="M 0 0 L 0 79 L 335 84 L 434 199 L 328 346 L 330 195 L 0 190 L 0 599 L 1079 599 L 1079 460 L 286 459 L 190 363 L 286 240 L 299 349 L 1079 349 L 1079 0 Z"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  </div>
)

export default SubtleBackground
