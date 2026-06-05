import { useState } from 'react'
import { useTheme } from '../../theme/ThemeContext'
import Card from '../../components/Card'
import Chip from '../../components/Chip'
import { historyItems, HistoryItem } from '../../data/mock'

type FilterKey = 'Barchasi' | 'Bugun' | 'Bu hafta'
const FILTERS: FilterKey[] = ['Barchasi', 'Bugun', 'Bu hafta']
const TODAY = '2026-06-05'

export default function HistoryPage() {
  const { c } = useTheme()
  const [filter, setFilter] = useState<FilterKey>('Barchasi')

  const filtered = historyItems.filter((item: HistoryItem) => {
    if (filter === 'Bugun') return item.date === TODAY
    return true
  })

  const todayTotal = historyItems.filter(i => i.date === TODAY).reduce((s, i) => s + i.price * i.people, 0)
  const monthTotal = historyItems.reduce((s, i) => s + i.price * i.people, 0)

  return (
    <div style={{ padding: '0 20px 32px', animation: 'mp-page 0.25s ease' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: c.ink, marginBottom: 2 }}>History</div>
        <div style={{ fontSize: 13, color: c.ink3 }}>Barcha to'lovlar tarixi</div>
      </div>

      {/* summary tiles */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <Card style={{ flex: 1 }} padding={14}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: c.ink3, textTransform: 'uppercase', marginBottom: 6 }}>Bugungi xarajat</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: c.ink }}>{(todayTotal / 1000).toFixed(0)}K</div>
          <div style={{ fontSize: 11, color: c.ink3 }}>UZS</div>
        </Card>
        <div style={{ flex: 1, background: c.primary, borderRadius: 16, padding: 14, color: '#fff' }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, opacity: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>Bu oy</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{(monthTotal / 1000).toFixed(0)}K</div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>UZS</div>
        </div>
      </div>

      {/* filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {FILTERS.map(f => <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Chip>)}
      </div>

      {/* list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: c.ink3, fontSize: 14 }}>No transactions yet</div>
        )}
        {filtered.map(item => (
          <Card key={item.id} padding={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: c.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: c.ink, marginBottom: 2 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: c.ink3 }}>{item.date} · {item.people} pp · {item.method}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.green, marginBottom: 2 }}>+{(item.cashback / 1000).toFixed(1)}K PARK</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.ink }}>{(item.price * item.people / 1000).toFixed(0)}K UZS</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
