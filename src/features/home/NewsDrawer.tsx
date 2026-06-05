import BottomSheet from '../../components/BottomSheet'
import { useTheme } from '../../theme/ThemeContext'
import { NewsSlide } from '../../data/mock'

interface NewsDrawerProps {
  slide:   NewsSlide | null
  onClose: () => void
}

export default function NewsDrawer({ slide, onClose }: NewsDrawerProps) {
  const { c } = useTheme()
  if (!slide) return null

  return (
    <BottomSheet open={!!slide} onClose={onClose} title={slide.tag}>
      <div style={{ height: 160, borderRadius: 14, background: slide.bg, display: 'flex', alignItems: 'flex-end', padding: 16, marginBottom: 16 }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: -0.4 }}>{slide.title}</span>
      </div>
      <p style={{ fontSize: 14, color: c.ink2, lineHeight: 1.7, marginBottom: 16 }}>{slide.body}</p>
      <button style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', background: c.primary, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
        Batafsil o'qish
      </button>
    </BottomSheet>
  )
}
