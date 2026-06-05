import { useEffect, ReactNode } from 'react'
import { useTheme } from '../theme/ThemeContext'
import Icon from './Icon'

interface BottomSheetProps {
  open:     boolean
  onClose:  () => void
  title:    string
  children: ReactNode
}

export default function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const { c } = useTheme()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position:   'fixed',
        inset:      0,
        background: 'rgba(8,15,20,0.5)',
        backdropFilter: 'blur(4px)',
        zIndex:     100,
        display:    'flex',
        alignItems: 'flex-end',
        animation:  'mp-fade 0.22s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width:        '100%',
          maxHeight:    '86%',
          background:   c.card,
          borderRadius: '26px 26px 0 0',
          boxShadow:    '0 -18px 50px rgba(0,0,0,0.3)',
          display:      'flex',
          flexDirection: 'column',
          animation:    'mp-sheet 0.34s cubic-bezier(0.16,1,0.3,1)',
          overflow:     'hidden',
        }}
      >
        {/* grabber */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4, flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: c.border }} />
        </div>

        {/* header */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '8px 20px 16px',
          flexShrink:     0,
        }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: c.ink }}>{title}</span>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              border: `1px solid ${c.border}`,
              background: c.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Icon name="x" size={16} color={c.ink2} />
          </button>
        </div>

        {/* body */}
        <div style={{ overflowY: 'auto', padding: '0 20px 32px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
