import BottomSheet from '../../components/BottomSheet'
import { useTheme } from '../../theme/ThemeContext'
import { Attraction, formatUZS } from '../../data/mock'
import Icon from '../../components/Icon'

interface RideDrawerProps {
  ride:     Attraction | null
  onClose:  () => void
  onPayNow: (ride: Attraction) => void
}

export default function RideDrawer({ ride, onClose, onPayNow }: RideDrawerProps) {
  const { c } = useTheme()
  if (!ride) return null

  const stats = [
    { label: 'Narx',   value: formatUZS(ride.price) + ' UZS' },
    { label: 'Kutish', value: ride.wait + ' min' },
    { label: 'Reyting', value: '★ ' + ride.rating },
  ]

  return (
    <BottomSheet open={!!ride} onClose={onClose} title={ride.name}>
      {/* hero */}
      <div style={{ height: 180, borderRadius: 14, background: ride.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
        <span style={{ fontSize: 60, position: 'relative', zIndex: 1 }}>{ride.emoji}</span>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 999, position: 'relative', zIndex: 1 }}>{ride.category}</span>
      </div>

      {/* stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {stats.map(s => (
          <div key={s.label} style={{ flex: 1, background: c.bg, borderRadius: 12, padding: '10px 8px', textAlign: 'center', border: `1px solid ${c.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: c.ink3, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.ink }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* badges */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: c.ink2, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: '6px 10px' }}>📏 {ride.height}</span>
        <span style={{ fontSize: 12, color: c.ink2, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: '6px 10px' }}>🔞 {ride.age}</span>
      </div>

      <p style={{ fontSize: 14, color: c.ink2, lineHeight: 1.65, marginBottom: 20 }}>{ride.description}</p>

      <button
        onClick={() => { onClose(); onPayNow(ride) }}
        style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', background: c.primary, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
      >
        <Icon name="flash" size={18} color="#fff" />
        Hozir to'lash
      </button>
    </BottomSheet>
  )
}
