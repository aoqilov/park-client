import { useState, useEffect } from 'react'
import { useTheme } from '../../theme/ThemeContext'
import { newsSlides, NewsSlide } from '../../data/mock'
import Icon from '../../components/Icon'
import NewsDrawer from './NewsDrawer'

export default function NewsCarousel() {
  const { c } = useTheme()
  const [idx, setIdx] = useState(0)
  const [activeSlide, setActiveSlide] = useState<NewsSlide | null>(null)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % newsSlides.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <div
        onClick={() => setActiveSlide(newsSlides[idx])}
        style={{ position: 'relative', height: 180, borderRadius: 18, overflow: 'hidden', cursor: 'pointer' }}
      >
        {newsSlides.map((s, i) => (
          <div
            key={s.id}
            style={{
              position: 'absolute', inset: 0,
              background: s.bg,
              opacity: i === idx ? 1 : 0,
              transition: 'opacity 0.6s',
              padding: 20,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              color: '#fff',
            }}
          >
            <div style={{ alignSelf: 'flex-start' }}>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, background: 'rgba(255,255,255,0.25)', padding: '5px 10px', borderRadius: 6 }}>{s.tag}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 13, opacity: 0.92 }}>{s.subtitle}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 999, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>Batafsil</span>
                <Icon name="chevron" size={14} color="#0F172A" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
        {newsSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{ width: i === idx ? 18 : 6, height: 6, borderRadius: 3, background: i === idx ? c.primary : c.border, border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s' }}
          />
        ))}
      </div>

      <NewsDrawer slide={activeSlide} onClose={() => setActiveSlide(null)} />
    </>
  )
}
