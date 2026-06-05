import { useState, useEffect } from 'react'
import { useTheme } from '../../theme/ThemeContext'
import { ThemeColors } from '../../theme/tokens'
import { mapPins, attractions, PinType } from '../../data/mock'

const PIN_COLOR_MAP: Partial<Record<PinType, keyof ThemeColors>> = {
  attraction: 'primary',
  cafe:       'amber',
  shop:       'rose',
  toilet:     'ink2',
}

export default function MapPage() {
  const { c } = useTheme()
  const [carIdx, setCarIdx] = useState(0)
  const [selPin, setSelPin] = useState<number | null>(null)

  useEffect(() => {
    const t = setInterval(() => setCarIdx(i => (i + 1) % attractions.length), 3000)
    return () => clearInterval(t)
  }, [])

  const ride    = attractions[carIdx]
  const selected = mapPins.find(p => p.id === selPin)

  return (
    <div style={{ padding: '0 20px 32px', animation: 'mp-page 0.25s ease' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: c.ink, marginBottom: 2 }}>Park Map</div>
        <div style={{ fontSize: 13, color: c.ink3 }}>Attraksionlar va xizmatlarni toping</div>
      </div>

      {/* carousel card */}
      <div style={{ background: c.card, borderRadius: 16, border: `1px solid ${c.border}`, padding: 14, marginBottom: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: ride.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
          <span style={{ position: 'relative', zIndex: 1 }}>{ride.emoji}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1, color: c.primary, textTransform: 'uppercase', marginBottom: 2 }}>{ride.category}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: c.ink, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ride.name}</div>
          <div style={{ display: 'flex', gap: 10, fontSize: 12, color: c.ink3 }}>
            <span>⏱ {ride.wait} min</span>
            <span>★ {ride.rating}</span>
            <span>{(ride.price / 1000).toFixed(0)}K UZS</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {attractions.map((_, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i === carIdx ? c.primary : c.border, transition: 'background 0.3s' }} />
          ))}
        </div>
      </div>

      {/* map */}
      <div style={{ height: 380, borderRadius: 18, background: '#E8F5E9', position: 'relative', overflow: 'hidden', border: `1px solid ${c.border}`, marginBottom: 12 }}>
        <svg viewBox="0 0 400 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <ellipse cx="80"  cy="120" rx="70" ry="55" fill="#A5D6A7" opacity="0.6" />
          <ellipse cx="320" cy="100" rx="65" ry="50" fill="#A5D6A7" opacity="0.6" />
          <ellipse cx="200" cy="300" rx="80" ry="55" fill="#A5D6A7" opacity="0.5" />
          <path d="M50 200 Q150 180 200 200 Q260 220 350 190" stroke="#D4C08A" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M200 50 Q210 150 200 200 Q190 260 200 350" stroke="#D4C08A" strokeWidth="16" fill="none" strokeLinecap="round" />
          <path d="M80 300 Q140 280 200 300 Q280 330 340 290" stroke="#D4C08A" strokeWidth="14" fill="none" strokeLinecap="round" />
          <ellipse cx="310" cy="260" rx="50" ry="35" fill="#81D4FA" opacity="0.7" />
          <ellipse cx="310" cy="260" rx="40" ry="26" fill="#B3E5FC" opacity="0.5" />
          {([[60,60],[100,80],[330,140],[350,80],[160,340],[240,330]] as [number,number][]).map(([x, y], i) => (
            <g key={i} transform={`translate(${x},${y})`}>
              <circle r="10" fill="#66BB6A" opacity="0.7" />
              <circle cx="6" cy="-4" r="7" fill="#4CAF50" opacity="0.7" />
              <circle cx="-6" cy="-4" r="7" fill="#81C784" opacity="0.7" />
            </g>
          ))}
        </svg>

        {/* legend */}
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', borderRadius: 10, padding: '6px 10px', fontSize: 11, fontWeight: 600, color: '#0F172A', display: 'flex', gap: 10 }}>
          <span>🎢 Rides</span><span>☕ Food</span><span>🛍️ Shop</span>
        </div>

        {/* pins */}
        {mapPins.map(pin => {
          const colorKey = PIN_COLOR_MAP[pin.type]
          const pinColor = colorKey ? c[colorKey] : '#2196F3'
          const isMe       = pin.type === 'me'
          const isSelected = selPin === pin.id

          return (
            <div
              key={pin.id}
              onClick={() => setSelPin(selPin === pin.id ? null : pin.id)}
              style={{ position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%`, transform: `translate(-50%, -50%) scale(${isSelected ? 1.15 : 1})`, cursor: 'pointer', transition: 'transform 0.2s', zIndex: isSelected ? 2 : 1 }}
            >
              {isMe ? (
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#2196F3', border: '3px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
                  <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '2px solid rgba(33,150,243,0.4)', animation: 'mp-pulse 2s infinite' }} />
                </div>
              ) : (
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#fff', border: `2.5px solid ${pinColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: isSelected ? `0 0 0 8px ${pinColor}33` : '0 2px 8px rgba(0,0,0,0.15)', transition: 'box-shadow 0.2s' }}>
                  {pin.emoji}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* selected detail */}
      {selected && selected.type !== 'me' && (
        <div style={{ background: c.card, borderRadius: 16, border: `1px solid ${c.border}`, padding: 14, display: 'flex', alignItems: 'center', gap: 12, animation: 'mp-page 0.2s ease' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: c.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{selected.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.ink }}>{selected.name}</div>
            <div style={{ fontSize: 12, color: c.ink3, textTransform: 'capitalize' }}>{selected.type}</div>
          </div>
          <button style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: c.primary, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Navigate</button>
        </div>
      )}
    </div>
  )
}
