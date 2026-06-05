import { useTheme } from '../../theme/ThemeContext'
import Card from '../../components/Card'
import WeatherGlyph from '../../components/WeatherGlyph'
import { weather, WeatherLocation } from '../../data/mock'

interface WeatherColProps {
  data:      WeatherLocation
  highlight: boolean
}

function WeatherCol({ data, highlight }: WeatherColProps) {
  const { c } = useTheme()
  return (
    <div style={{ flex: 1, padding: '16px 16px 14px', background: highlight ? c.primarySoft : 'transparent' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: highlight ? c.primaryDark : c.ink3 }}>
          {highlight ? 'Park' : 'Shahar'}
        </span>
        <WeatherGlyph type={data.icon} size={30} />
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: c.ink2, marginBottom: 4 }}>{data.name}</div>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 2 }}>
        <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, color: c.ink, lineHeight: 1 }}>{data.temp}</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: c.ink, marginTop: 2 }}>°</span>
      </div>
      <div style={{ fontSize: 11, color: c.ink3 }}>{data.condition}</div>
      <div style={{ fontSize: 11, color: c.ink3, marginTop: 2 }}>His {data.feels}° · {data.hi}°/{data.lo}°</div>
    </div>
  )
}

export default function WeatherCard() {
  const { c } = useTheme()
  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex' }}>
        <WeatherCol data={weather.city} highlight={false} />
        <div style={{ width: 1, background: c.border }} />
        <WeatherCol data={weather.park} highlight={true} />
      </div>
      <div style={{ borderTop: `1px solid ${c.border}`, background: c.bg, padding: '10px 6px', display: 'flex' }}>
        {weather.park.forecast.map(f => (
          <div key={f.day} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: c.ink3, marginBottom: 3 }}>{f.day}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.ink }}>{f.temp}°</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
