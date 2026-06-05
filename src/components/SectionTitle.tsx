import { ReactNode } from 'react'
import { useTheme } from '../theme/ThemeContext'

interface SectionTitleProps {
  children: ReactNode
  action?:  ReactNode
}

export default function SectionTitle({ children, action }: SectionTitleProps) {
  const { c } = useTheme()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <span style={{ fontSize: 17, fontWeight: 700, color: c.ink }}>{children}</span>
      {action}
    </div>
  )
}
