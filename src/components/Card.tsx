import { ReactNode, CSSProperties } from 'react'
import { useTheme } from '../theme/ThemeContext'

interface CardProps {
  children:  ReactNode
  style?:    CSSProperties
  padding?:  number | string
  onClick?:  () => void
  radius?:   number
}

export default function Card({ children, style, padding = 16, onClick, radius = 16 }: CardProps) {
  const { isDark, c } = useTheme()
  return (
    <div
      onClick={onClick}
      style={{
        background:   c.card,
        borderRadius: radius,
        border:       `1px solid ${c.border}`,
        padding,
        boxShadow: isDark
          ? '0 1px 2px rgba(0,0,0,0.4), 0 6px 20px rgba(0,0,0,0.35)'
          : '0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
