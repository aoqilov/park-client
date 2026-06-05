interface WeatherGlyphProps {
  type?: 'sun' | 'haze'
  size?: number
}

export default function WeatherGlyph({ type = 'sun', size = 30 }: WeatherGlyphProps) {
  if (type === 'sun') {
    return (
      <div style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width:     size * 0.45,
          height:    size * 0.45,
          borderRadius: '50%',
          background:   '#F59E0B',
          boxShadow:    `0 0 ${size * 0.3}px #F59E0B88`,
        }} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
          <div key={deg} style={{
            position:        'absolute',
            width:           size * 0.1,
            height:          size * 0.08,
            background:      '#F59E0B',
            borderRadius:    2,
            transformOrigin: 'center',
            transform:       `rotate(${deg}deg) translateX(${size * 0.38}px)`,
          }} />
        ))}
      </div>
    )
  }

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: size * 0.12, left: size * 0.05, width: size * 0.82, height: size * 0.38, borderRadius: 999, background: 'rgba(148,163,184,0.5)' }} />
      <div style={{ position: 'absolute', bottom: size * 0.3,  left: size * 0.2,  width: size * 0.6,  height: size * 0.4,  borderRadius: 999, background: 'rgba(148,163,184,0.6)' }} />
      <div style={{ position: 'absolute', bottom: size * 0.45, left: size * 0.3,  width: size * 0.42, height: size * 0.38, borderRadius: 999, background: 'rgba(148,163,184,0.7)' }} />
    </div>
  )
}
