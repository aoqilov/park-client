import { ReactNode, CSSProperties } from 'react'
import { useTheme } from '../theme/ThemeContext'

interface ChipProps {
  children:  ReactNode
  active?:   boolean
  onClick?:  () => void
  style?:    CSSProperties
}

export default function Chip({ children, active, onClick, style }: ChipProps) {
  const { c } = useTheme()
  return (
    <button
      onClick={onClick}
      style={{
        padding:      '6px 14px',
        borderRadius: 999,
        border:       `1px solid ${active ? c.primary : c.border}`,
        background:   active ? c.primarySoft : c.card,
        color:        active ? c.primaryDark : c.ink2,
        fontSize:     13,
        fontWeight:   600,
        cursor:       'pointer',
        transition:   'all 0.2s',
        whiteSpace:   'nowrap',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
