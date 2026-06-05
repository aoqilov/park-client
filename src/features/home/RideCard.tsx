import { useTheme } from '../../theme/ThemeContext'
import { Attraction, formatUZS } from '../../data/mock'
import Icon from '../../components/Icon'

interface RideCardProps {
  ride:    Attraction
  onClick: () => void
}

export default function RideCard({ ride, onClick }: RideCardProps) {
  const { c } = useTheme()

  return (
    <div
      onClick={onClick}
      style={{ minWidth: 210, width: 210, height: 280, borderRadius: 18, overflow: 'hidden', position: 'relative', cursor: 'pointer', flexShrink: 0 }}
    >
      <div style={{ position: 'absolute', inset: 0, background: ride.bg }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 8px)` }} />
      <div style={{ position: 'absolute', top: 14, left: 0, right: 0, display: 'flex', justifyContent: 'center', fontSize: 54, opacity: 0.9 }}>{ride.emoji}</div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.30)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.55) 100%)' }} />

      <div style={{ position: 'absolute', inset: 0, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
          <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', padding: '4px 8px', borderRadius: 999 }}>{ride.category}</span>
          <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', padding: '4px 8px', borderRadius: 999 }}>★ {ride.rating}</span>
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3, marginBottom: 3 }}>{ride.name}</div>
          <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 12 }}>{formatUZS(ride.price)} UZS · {ride.wait} min</div>
          <button style={{ width: '100%', padding: '11px 0', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.95)', color: '#0F172A', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            More Info <Icon name="chevron" size={14} color="#0F172A" />
          </button>
        </div>
      </div>
    </div>
  )
}
