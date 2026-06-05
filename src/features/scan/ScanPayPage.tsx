import { useState } from 'react'
import { useTheme } from '../../theme/ThemeContext'
import { ThemeColors } from '../../theme/tokens'
import Icon from '../../components/Icon'
import { formatUZS, attractions as allAttractions, Attraction } from '../../data/mock'

type PaymentMethod = 'Click' | 'Payme' | 'Uzum'
const METHODS: PaymentMethod[] = ['Click', 'Payme', 'Uzum']

interface StepIndicatorProps { step: number; c: ThemeColors }
function StepIndicator({ step, c }: StepIndicatorProps) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
      {[1, 2, 3].map(s => (
        <div key={s} style={{ flex: 1, height: 4, borderRadius: 999, background: s <= step ? c.primary : c.border, transition: 'background 0.3s' }} />
      ))}
    </div>
  )
}

interface Step1Props { onScan: () => void; preselected: Attraction | null; c: ThemeColors }
function Step1({ onScan, preselected, c }: Step1Props) {
  const corners = [
    { top: 16, left: 16, borderTop: true,  borderLeft: true,  borderBottom: false, borderRight: false },
    { top: 16, right: 16, borderTop: true,  borderLeft: false, borderBottom: false, borderRight: true  },
    { bottom: 16, left: 16, borderTop: false, borderLeft: true,  borderBottom: true,  borderRight: false },
    { bottom: 16, right: 16, borderTop: false, borderLeft: false, borderBottom: true,  borderRight: true  },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: '#0F172A', borderRadius: 20, padding: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', minHeight: 260 }}>
        {corners.map((pos, i) => {
          const { borderTop, borderLeft, borderBottom, borderRight, ...posStyle } = pos
          return (
            <div key={i} style={{
              position: 'absolute', width: 28, height: 28,
              ...posStyle,
              borderTop:    borderTop    ? `3px solid ${c.primary}` : 'none',
              borderBottom: borderBottom ? `3px solid ${c.primary}` : 'none',
              borderLeft:   borderLeft   ? `3px solid ${c.primary}` : 'none',
              borderRight:  borderRight  ? `3px solid ${c.primary}` : 'none',
              borderTopLeftRadius:     (!pos.borderRight && !pos.borderBottom) ? 4 : 0,
              borderTopRightRadius:    (!pos.borderLeft  && !pos.borderBottom) ? 4 : 0,
              borderBottomLeftRadius:  (!pos.borderRight && !pos.borderTop)    ? 4 : 0,
              borderBottomRightRadius: (!pos.borderLeft  && !pos.borderTop)    ? 4 : 0,
            }} />
          )
        })}
        <div style={{ position: 'absolute', left: 30, right: 30, height: 2, background: `linear-gradient(90deg, transparent, ${c.primary}, ${c.primary}88, transparent)`, boxShadow: `0 0 8px ${c.primary}`, animation: 'mp-scan 2.5s linear infinite' }} />
        <div style={{ color: c.ink3, fontSize: 13, textAlign: 'center', zIndex: 1 }}>QR kodni kameraga tutib turing</div>
      </div>

      {preselected && (
        <div style={{ background: c.primarySoft, borderRadius: 14, padding: 14, border: `1px solid ${c.primary}44`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28 }}>{preselected.emoji}</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.primary, letterSpacing: 0.8, marginBottom: 2 }}>TANLANGAN</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.ink }}>{preselected.name}</div>
          </div>
        </div>
      )}

      <button onClick={onScan} style={{ width: '100%', padding: '15px 0', borderRadius: 14, border: 'none', background: c.primary, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Icon name="scan" size={20} color="#fff" />
        Skanerlashni simulyatsiya qilish
      </button>
    </div>
  )
}

interface Step2Props {
  attraction: Attraction
  people:     number
  setPeople:  (fn: (p: number) => number) => void
  method:     PaymentMethod
  setMethod:  (m: PaymentMethod) => void
  onPay:      (result: PayResult) => void
  c:          ThemeColors
}

interface PayResult { subtotal: number; cashback: number; total: number; people: number; method: PaymentMethod }

function Step2({ attraction, people, setPeople, method, setMethod, onPay, c }: Step2Props) {
  const subtotal = attraction.price * people
  const cashback = Math.floor(subtotal * 0.05)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ borderRadius: 14, overflow: 'hidden', background: attraction.bg, position: 'relative', height: 100, display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        <span style={{ fontSize: 44, position: 'relative', zIndex: 1 }}>{attraction.emoji}</span>
        <div style={{ position: 'relative', zIndex: 1, color: '#fff' }}>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3 }}>{attraction.name}</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>{formatUZS(attraction.price)} UZS / kishi</div>
        </div>
      </div>

      {/* stepper */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.ink, marginBottom: 2 }}>Odamlar soni</div>
          <div style={{ fontSize: 12, color: c.ink3 }}>1 dan 10 gacha</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {[{ icon: 'minus' as const, action: () => setPeople(p => Math.max(1, p - 1)), disabled: people === 1 },
            { icon: 'plus'  as const, action: () => setPeople(p => Math.min(10, p + 1)), disabled: people === 10 }
          ].map((btn, i) => (
            <button key={i} onClick={btn.action} disabled={btn.disabled} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${c.border}`, background: btn.disabled ? c.bg : c.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: btn.disabled ? 'default' : 'pointer', opacity: btn.disabled ? 0.4 : 1 }}>
              <Icon name={btn.icon} size={16} color={c.ink} />
            </button>
          )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <span key="n" style={{ fontSize: 22, fontWeight: 800, color: c.ink, minWidth: 28, textAlign: 'center' }}>{people}</span>, el], [] as React.ReactNode[])}
        </div>
      </div>

      {/* summary */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14, color: c.ink2 }}>
          <span>{formatUZS(attraction.price)} × {people}</span>
          <span>{formatUZS(subtotal)} UZS</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
          <span style={{ color: c.green }}>Cashback (5%)</span>
          <span style={{ color: c.green }}>+{formatUZS(cashback)} UZS</span>
        </div>
        <div style={{ height: 1, background: c.border, marginBottom: 12 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, color: c.ink }}>
          <span>Jami</span>
          <span>{formatUZS(subtotal)} UZS</span>
        </div>
      </div>

      {/* method */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: c.ink2, marginBottom: 10 }}>To'lov usuli</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {METHODS.map(m => (
            <button key={m} onClick={() => setMethod(m)} style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: `1.5px solid ${method === m ? c.primary : c.border}`, background: method === m ? c.primarySoft : c.card, color: method === m ? c.primaryDark : c.ink2, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>{m}</button>
          ))}
        </div>
      </div>

      <button onClick={() => onPay({ subtotal, cashback, total: subtotal, people, method })} style={{ width: '100%', padding: '15px 0', borderRadius: 14, border: 'none', background: c.primary, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
        To'lash {formatUZS(subtotal)} UZS
      </button>
    </div>
  )
}

interface Step3Props { receipt: Receipt; onReset: () => void; c: ThemeColors }
interface Receipt { name: string; people: number; method: PaymentMethod; cashback: number; total: number }

function Step3({ receipt, onReset, c }: Step3Props) {
  const num = String(Math.floor(Math.random() * 90000) + 10000)
  const rows: [string, string | number][] = [
    ['Attraksion', receipt.name],
    ['Odamlar', receipt.people],
    ['Usul', receipt.method],
    ['Cashback', `+${formatUZS(receipt.cashback)} UZS`],
    ['Sana', new Date().toLocaleDateString('uz-UZ')],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: c.green, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'mp-pop 0.5s cubic-bezier(0.34,1.56,0.64,1)', marginTop: 12 }}>
        <Icon name="check" size={40} color="#fff" />
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: c.ink, textAlign: 'center' }}>To'lov muvaffaqiyatli!</div>

      <div style={{ width: '100%', background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 18 }}>
        {rows.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14 }}>
            <span style={{ color: c.ink3 }}>{label}</span>
            <span style={{ color: label === 'Cashback' ? c.green : c.ink, fontWeight: 600 }}>{value}</span>
          </div>
        ))}
        <div style={{ height: 1, background: c.border, margin: '12px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, color: c.ink, marginBottom: 12 }}>
          <span>Jami to'landi</span>
          <span>{formatUZS(receipt.total)} UZS</span>
        </div>
        <div style={{ textAlign: 'center', fontSize: 12, fontFamily: 'monospace', color: c.ink3 }}>#{num}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
        <button style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: `1px solid ${c.border}`, background: c.card, color: c.ink, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>PDF Yuklab olish</button>
        <button onClick={onReset} style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', background: c.primary, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Yana skanerlash</button>
      </div>
    </div>
  )
}

interface ScanPayPageProps { preselected?: Attraction | null }

export default function ScanPayPage({ preselected }: ScanPayPageProps) {
  const { c } = useTheme()
  const [step, setStep]           = useState<1 | 2 | 3>(preselected ? 2 : 1)
  const [attraction, setAttraction] = useState<Attraction | null>(preselected ?? null)
  const [people, setPeople]       = useState(1)
  const [method, setMethod]       = useState<PaymentMethod>('Click')
  const [receipt, setReceipt]     = useState<Receipt | null>(null)

  const TITLES: Record<1 | 2 | 3, string> = { 1: 'QR Skanerlash', 2: "To'lov", 3: 'Muvaffaqiyat' }

  function handleScan() {
    const random = allAttractions[Math.floor(Math.random() * allAttractions.length)]
    setAttraction(random)
    setStep(2)
  }

  function handlePay(result: PayResult) {
    setReceipt({ name: attraction!.name, people: result.people, method: result.method, cashback: result.cashback, total: result.total })
    setStep(3)
  }

  function handleReset() {
    setStep(1); setAttraction(null); setPeople(1); setMethod('Click'); setReceipt(null)
  }

  return (
    <div style={{ padding: '0 20px 32px', animation: 'mp-page 0.25s ease' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: c.ink }}>{TITLES[step]}</div>
      </div>
      <StepIndicator step={step} c={c} />

      {step === 1 && <Step1 onScan={handleScan} preselected={preselected ?? null} c={c} />}
      {step === 2 && attraction && (
        <Step2 attraction={attraction} people={people} setPeople={setPeople} method={method} setMethod={setMethod} onPay={handlePay} c={c} />
      )}
      {step === 3 && receipt && <Step3 receipt={receipt} onReset={handleReset} c={c} />}
    </div>
  )
}
