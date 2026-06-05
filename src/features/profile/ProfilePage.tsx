import { useState, ReactNode } from 'react'
import { useTheme } from '../../theme/ThemeContext'
import { ThemeMode } from '../../theme/ThemeContext'
import { ThemeColors } from '../../theme/tokens'
import Avatar from '../../components/Avatar'
import Icon from '../../components/Icon'
import Card from '../../components/Card'
import { IconName } from '../../components/Icon'

type LangOption = 'Uzbek' | 'Russian' | 'English'
const LANGS: LangOption[] = ['Uzbek', 'Russian', 'English']

interface SegmentedToggleProps<T extends string> {
  options:  T[]
  value:    T
  onChange: (v: T) => void
  c:        ThemeColors
}

function SegmentedToggle<T extends string>({ options, value, onChange, c }: SegmentedToggleProps<T>) {
  return (
    <div style={{ display: 'flex', background: c.bg, borderRadius: 10, padding: 3, gap: 2 }}>
      {options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)} style={{ flex: 1, padding: '6px 0', borderRadius: 8, border: 'none', background: value === opt ? c.card : 'transparent', color: value === opt ? c.ink : c.ink3, fontSize: 12, fontWeight: 600, cursor: 'pointer', boxShadow: value === opt ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}>
          {opt}
        </button>
      ))}
    </div>
  )
}

interface MenuRowProps {
  icon:      IconName
  label:     string
  value?:    string
  danger?:   boolean
  chevron?:  boolean
  children?: ReactNode
  c:         ThemeColors
}

function MenuRow({ icon, label, value, danger = false, chevron = true, children, c }: MenuRowProps) {
  return (
    <div style={{ padding: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: children ? 10 : 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: danger ? 'rgba(244,63,94,0.1)' : c.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={18} color={danger ? c.rose : c.primary} />
        </div>
        <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: danger ? c.rose : c.ink }}>{label}</span>
        {value && <span style={{ fontSize: 13, color: c.ink3 }}>{value}</span>}
        {chevron && <Icon name="chevron" size={16} color={c.ink3} />}
      </div>
      {children && <div style={{ paddingLeft: 48 }}>{children}</div>}
    </div>
  )
}

export default function ProfilePage() {
  const { c, isDark, setMode } = useTheme()
  const [lang, setLang] = useState<LangOption>('Uzbek')

  return (
    <div style={{ padding: '0 20px 32px', animation: 'mp-page 0.25s ease' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: c.ink, marginBottom: 20 }}>Profile</div>

      {/* user card */}
      <Card padding={20} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar initials="AK" size={64} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: c.ink, marginBottom: 4 }}>Akbar Karimov</div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, background: c.amber, color: '#fff', padding: '3px 8px', borderRadius: 999, display: 'inline-block', marginBottom: 6 }}>GOLD MEMBER</span>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.primary }}>10 500 PARK points</div>
          </div>
        </div>
      </Card>

      {/* settings card */}
      <Card padding="0 16px" style={{ marginBottom: 12 }}>
        <MenuRow icon="card" label="Linked Cards" value="2 connected" c={c} />
        <div style={{ height: 1, background: c.border, marginLeft: 48 }} />

        <MenuRow icon="globe" label="Language" chevron={false} c={c}>
          <SegmentedToggle<LangOption> options={LANGS} value={lang} onChange={setLang} c={c} />
        </MenuRow>
        <div style={{ height: 1, background: c.border, marginLeft: 48 }} />

        <MenuRow icon={isDark ? 'moon' : 'sun'} label="Theme" chevron={false} c={c}>
          <SegmentedToggle<ThemeMode>
            options={['light', 'dark']}
            value={isDark ? 'dark' : 'light'}
            onChange={setMode}
            c={c}
          />
        </MenuRow>
      </Card>

      {/* security card */}
      <Card padding="0 16px" style={{ marginBottom: 24 }}>
        <MenuRow icon="lock" label="Security" c={c} />
        <div style={{ height: 1, background: c.border, marginLeft: 48 }} />
        <MenuRow icon="logout" label="Logout" danger chevron={false} c={c} />
      </Card>

      <div style={{ textAlign: 'center', fontSize: 12, color: c.ink3 }}>Magic Park v1.0 · 2026</div>
    </div>
  )
}
