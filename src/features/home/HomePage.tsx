import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../theme/ThemeContext'
import Icon from '../../components/Icon'
import Avatar from '../../components/Avatar'
import SectionTitle from '../../components/SectionTitle'
import WeatherCard from './WeatherCard'
import NewsCarousel from './NewsCarousel'
import RideCard from './RideCard'
import RideDrawer from './RideDrawer'
import SpendingCard from './SpendingCard'
import { attractions, Attraction } from '../../data/mock'

interface HomePageProps {
  onPayNow: (ride: Attraction) => void
}

export default function HomePage({ onPayNow }: HomePageProps) {
  const { c, isDark, toggle } = useTheme()
  const navigate = useNavigate()
  const [activeRide, setActiveRide] = useState<Attraction | null>(null)

  return (
    <div style={{ minHeight: '100%', background: c.bg, animation: 'mp-page 0.25s ease' }}>
      {/* header */}
      <div style={{ padding: '8px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: c.ink3, textTransform: 'uppercase' }}>WELCOME TO</div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, color: c.ink }}>Magic Park</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* theme toggle */}
          <button onClick={toggle} style={{ width: 40, height: 40, borderRadius: '50%', background: c.card, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name={isDark ? 'sun' : 'moon'} size={18} color={c.ink2} />
          </button>

          {/* moments button */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => navigate('/moments')} style={{ width: 40, height: 40, borderRadius: '50%', background: c.card, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name="photo" size={18} color={c.ink2} />
            </button>
            <div style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: '50%', background: c.rose, border: `1.5px solid ${c.card}` }} />
          </div>

          {/* points + avatar */}
          <div style={{ background: c.primarySoft, borderRadius: 999, padding: '5px 6px 5px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.primaryDark, lineHeight: 1.2 }}>125</div>
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.8, color: c.primaryDark, textTransform: 'uppercase' }}>PARK</div>
            </div>
            <Avatar initials="AK" size={32} />
          </div>
        </div>
      </div>

      {/* content */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 22, paddingBottom: 32 }}>
        <div><SectionTitle>Ob-havo</SectionTitle><WeatherCard /></div>
        <div><SectionTitle>Yangiliklar</SectionTitle><NewsCarousel /></div>

        <div>
          <SectionTitle action={
            <button style={{ fontSize: 13, fontWeight: 600, color: c.primary, background: 'none', border: 'none', cursor: 'pointer' }}>Barchasi →</button>
          }>
            Suggested Rides
          </SectionTitle>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', margin: '0 -20px', padding: '4px 20px 8px', scrollbarWidth: 'none' }}>
            {attractions.map(ride => (
              <RideCard key={ride.id} ride={ride} onClick={() => setActiveRide(ride)} />
            ))}
          </div>
        </div>

        <SpendingCard />
      </div>

      <RideDrawer ride={activeRide} onClose={() => setActiveRide(null)} onPayNow={onPayNow} />
    </div>
  )
}
