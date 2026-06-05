import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { ThemeProvider, useTheme } from './theme/ThemeContext'
import { Attraction } from './data/mock'
import Icon from './components/Icon'
import { IconName } from './components/Icon'
import HomePage from './features/home/HomePage'
import MapPage from './features/map/MapPage'
import ScanPayPage from './features/scan/ScanPayPage'
import HistoryPage from './features/history/HistoryPage'
import MomentsPage from './features/moments/MomentsPage'
import ProfilePage from './features/profile/ProfilePage'

interface TabDef {
  path:  string
  icon:  IconName
  label: string
}

const TABS: TabDef[] = [
  { path: '/home',    icon: 'home',    label: 'Bosh' },
  { path: '/map',     icon: 'map',     label: 'Xarita' },
  { path: '/scan',    icon: 'scan',    label: '' },
  { path: '/history', icon: 'history', label: 'Tarix' },
  { path: '/profile', icon: 'user',    label: 'Profil' },
]

function BottomTabBar() {
  const { c } = useTheme()
  const navigate  = useNavigate()
  const location  = useLocation()
  const active    = location.pathname

  if (active === '/moments') return null

  return (
    <nav style={{
      position:       'fixed',
      bottom:         0,
      left:           0,
      right:          0,
      height:         60,
      background:     c.card,
      borderTop:      `1px solid ${c.border}`,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-around',
      paddingBottom:  'env(safe-area-inset-bottom)',
      zIndex:         50,
    }}>
      {TABS.map(tab => {
        const isScan   = tab.path === '/scan'
        const isActive = active === tab.path

        if (isScan) {
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{ width: 60, height: 60, borderRadius: '50%', background: c.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: -18, boxShadow: `0 6px 18px ${c.primary}66` }}
            >
              <Icon name="scan" size={26} color="#fff" />
            </button>
          )
        }

        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', color: isActive ? c.primary : c.ink3, transition: 'color 0.2s' }}
          >
            <Icon name={tab.icon} size={22} color={isActive ? c.primary : c.ink3} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500 }}>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function AppContent() {
  const { c }   = useTheme()
  const navigate = useNavigate()
  const [preselected, setPreselected] = useState<Attraction | null>(null)

  function handlePayNow(ride: Attraction) {
    setPreselected(ride)
    navigate('/scan')
  }

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: c.bg, maxWidth: 430, margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 'env(safe-area-inset-top)', paddingBottom: 60 }}>
        <Routes>
          <Route path="/"        element={<Navigate to="/home" replace />} />
          <Route path="/home"    element={<HomePage onPayNow={handlePayNow} />} />
          <Route path="/map"     element={<MapPage />} />
          <Route path="/scan"    element={<ScanPayPage preselected={preselected} />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/moments" element={<MomentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
      <BottomTabBar />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  )
}
