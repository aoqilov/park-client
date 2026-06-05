import { useTheme } from '../theme/ThemeContext'

interface MediaPlaceholderProps {
  height?: number
  emoji?:  string
  label?:  string
}

export default function MediaPlaceholder({ height = 260, emoji = '🏞️', label = 'Photo / Video' }: MediaPlaceholderProps) {
  const { c } = useTheme()
  return (
    <div style={{
      height,
      borderRadius: 14,
      overflow:     'hidden',
      position:     'relative',
      background:   c.bg,
      display:      'flex',
      flexDirection: 'column',
      alignItems:   'center',
      justifyContent: 'center',
      gap: 8,
    }}>
      <div style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: `repeating-linear-gradient(45deg, ${c.border} 0px, ${c.border} 1px, transparent 1px, transparent 12px)`,
        opacity:         0.4,
      }} />
      <span style={{ fontSize: 40, position: 'relative', zIndex: 1 }}>{emoji}</span>
      <span style={{ fontSize: 12, color: c.ink3, fontWeight: 600, position: 'relative', zIndex: 1 }}>{label}</span>
    </div>
  )
}
