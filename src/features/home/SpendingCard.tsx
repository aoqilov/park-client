import { useTheme } from '../../theme/ThemeContext'
import { useNavigate } from 'react-router-dom'
import SectionTitle from '../../components/SectionTitle'

export default function SpendingCard() {
  const { c, isDark } = useTheme()
  const navigate = useNavigate()

  const bgColor    = isDark ? c.card : c.ink
  const textColor  = isDark ? c.ink  : '#fff'
  const borderStyle = isDark ? `1px solid ${c.border}` : 'none'
  const trackColor = 'rgba(255,255,255,0.14)'
  const dividerColor = 'rgba(255,255,255,0.14)'

  const segments = [
    { color: c.primary, label: 'Attraksion', value: '90.3K', width: '43%' },
    { color: c.amber,   label: 'Ovqat',       value: '54.6K', width: '26%' },
    { color: c.green,   label: 'Boshqa',      value: '65.1K', width: '31%' },
  ]

  return (
    <div>
      <SectionTitle action={
        <button onClick={() => navigate('/history')} style={{ fontSize: 13, fontWeight: 600, color: c.primary, background: 'none', border: 'none', cursor: 'pointer' }}>
          History →
        </button>
      }>
        Bugungi xarajat
      </SectionTitle>

      <div style={{ background: bgColor, borderRadius: 18, padding: 20, border: borderStyle, color: textColor }}>
        {/* top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, opacity: 0.6, textTransform: 'uppercase', marginBottom: 4 }}>Bugun sarflandi</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
              <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>210</span>
              <span style={{ fontSize: 15, opacity: 0.65, marginBottom: 4 }}>K UZS</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {[{ label: 'RIDES', value: '3' }, { label: 'CASHBACK', value: '10.5K' }].map(s => (
              <div key={s.label} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1, opacity: 0.55, textTransform: 'uppercase' }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* bar */}
        <div style={{ height: 8, borderRadius: 999, background: trackColor, display: 'flex', overflow: 'hidden', marginBottom: 12 }}>
          {segments.map(s => <div key={s.label} style={{ width: s.width, background: s.color }} />)}
        </div>

        {/* legend */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          {segments.map(s => (
            <div key={s.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: s.color }} />
                <span style={{ fontSize: 10, opacity: 0.7 }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* footer */}
        <div style={{ borderTop: `1px solid ${dividerColor}`, paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.8 }}>
          <span>Kunlik byudjet · 300K</span>
          <span style={{ fontWeight: 700 }}>90K qoldi</span>
        </div>
      </div>
    </div>
  )
}
