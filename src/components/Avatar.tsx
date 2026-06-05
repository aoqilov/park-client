import { useTheme } from '../theme/ThemeContext'

interface AvatarProps {
  initials?: string
  size?:     number
}

export default function Avatar({ initials = '?', size = 32 }: AvatarProps) {
  const { c } = useTheme()
  return (
    <div style={{
      width:          size,
      height:         size,
      borderRadius:   '50%',
      background:     c.primary,
      color:          '#fff',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      fontSize:       size * 0.36,
      fontWeight:     700,
      flexShrink:     0,
      letterSpacing:  0.5,
    }}>
      {initials}
    </div>
  )
}
