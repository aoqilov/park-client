import { CSSProperties } from 'react'

export type IconName =
  | 'home' | 'map' | 'scan' | 'history' | 'user' | 'photo'
  | 'heart' | 'chevron' | 'chevron-left' | 'plus' | 'minus'
  | 'star' | 'check' | 'pin' | 'card' | 'globe' | 'moon' | 'sun'
  | 'lock' | 'logout' | 'trophy' | 'upload' | 'x' | 'flash' | 'camera'

interface IconProps {
  name:    IconName
  size?:   number
  color?:  string
  filled?: boolean
  style?:  CSSProperties
}

export default function Icon({ name, size = 24, color = 'currentColor', filled = false, style }: IconProps) {
  const shared = { strokeWidth: 1.8, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  function shape() {
    switch (name) {
      case 'home':
        return <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" {...shared} />
      case 'map':
        return <>
          <path d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" {...shared} />
          <line x1="9" y1="3" x2="9" y2="18" strokeWidth="1.8" />
          <line x1="15" y1="6" x2="15" y2="21" strokeWidth="1.8" />
        </>
      case 'scan':
        return <>
          <rect x="4" y="4" width="5" height="5" rx="1" {...shared} />
          <rect x="15" y="4" width="5" height="5" rx="1" {...shared} />
          <rect x="4" y="15" width="5" height="5" rx="1" {...shared} />
          <path d="M15 15h2v2h-2zm4 0v2m0 2v2m-2 0h2" {...shared} />
        </>
      case 'history':
        return <>
          <circle cx="12" cy="12" r="9" {...shared} />
          <polyline points="12 7 12 12 15 14" {...shared} />
        </>
      case 'user':
        return <>
          <circle cx="12" cy="8" r="4" {...shared} />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" {...shared} />
        </>
      case 'photo':
        return <>
          <rect x="3" y="5" width="18" height="15" rx="2" {...shared} />
          <circle cx="12" cy="12" r="3.5" {...shared} />
          <path d="M9 5l1.5-2h3L15 5" {...shared} />
        </>
      case 'heart':
        return <path
          d="M12 21C12 21 3 14.5 3 8.5A4.5 4.5 0 0112 5.5 4.5 4.5 0 0121 8.5C21 14.5 12 21 12 21z"
          strokeWidth="1.8"
          fill={filled ? color : 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      case 'chevron':
        return <polyline points="9 6 15 12 9 18" {...shared} />
      case 'chevron-left':
        return <polyline points="15 6 9 12 15 18" {...shared} />
      case 'plus':
        return <>
          <line x1="12" y1="5" x2="12" y2="19" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="5" y1="12" x2="19" y2="12" strokeWidth="1.8" strokeLinecap="round" />
        </>
      case 'minus':
        return <line x1="5" y1="12" x2="19" y2="12" strokeWidth="1.8" strokeLinecap="round" />
      case 'star':
        return <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth="1.8" fill="none" />
      case 'check':
        return <polyline points="4 12 9 17 20 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      case 'pin':
        return <>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" {...shared} />
          <circle cx="12" cy="9" r="2.5" {...shared} />
        </>
      case 'card':
        return <>
          <rect x="2" y="5" width="20" height="14" rx="2" {...shared} />
          <line x1="2" y1="10" x2="22" y2="10" strokeWidth="1.8" />
        </>
      case 'globe':
        return <>
          <circle cx="12" cy="12" r="9" {...shared} />
          <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" {...shared} />
        </>
      case 'moon':
        return <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" {...shared} />
      case 'sun':
        return <>
          <circle cx="12" cy="12" r="4" {...shared} />
          <line x1="12" y1="2" x2="12" y2="4" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="12" y1="20" x2="12" y2="22" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="2" y1="12" x2="4" y2="12" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="20" y1="12" x2="22" y2="12" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="1.8" strokeLinecap="round" />
        </>
      case 'lock':
        return <>
          <rect x="5" y="11" width="14" height="10" rx="2" {...shared} />
          <path d="M8 11V7a4 4 0 018 0v4" {...shared} />
        </>
      case 'logout':
        return <>
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" {...shared} />
          <polyline points="16 17 21 12 16 7" {...shared} />
          <line x1="21" y1="12" x2="9" y2="12" strokeWidth="1.8" />
        </>
      case 'trophy':
        return <>
          <path d="M8 21h8m-4 0v-4m0 0a6 6 0 006-6V5H6v6a6 6 0 006 6z" {...shared} />
          <path d="M6 5H3v3a3 3 0 003 3M18 5h3v3a3 3 0 01-3 3" {...shared} />
        </>
      case 'upload':
        return <>
          <polyline points="16 16 12 12 8 16" {...shared} />
          <line x1="12" y1="12" x2="12" y2="21" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" {...shared} />
        </>
      case 'x':
        return <>
          <line x1="18" y1="6" x2="6" y2="18" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="6" y1="6" x2="18" y2="18" strokeWidth="1.8" strokeLinecap="round" />
        </>
      case 'flash':
        return <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      case 'camera':
        return <>
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" {...shared} />
          <circle cx="12" cy="13" r="4" {...shared} />
        </>
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      {shape()}
    </svg>
  )
}
