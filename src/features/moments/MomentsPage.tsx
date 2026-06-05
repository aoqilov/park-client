import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../theme/ThemeContext'
import { ThemeColors } from '../../theme/tokens'
import Icon from '../../components/Icon'
import Avatar from '../../components/Avatar'
import Chip from '../../components/Chip'
import MediaPlaceholder from '../../components/MediaPlaceholder'
import { moments as initialMoments, Moment } from '../../data/mock'

type PeriodKey = 'Kunlik' | 'Haftalik' | 'Oylik'
const PERIODS: PeriodKey[] = ['Kunlik', 'Haftalik', 'Oylik']
const UPLOAD_EMOJIS = ['🎢', '🎡', '🏰', '🎠', '🍦']

interface WinnerCardProps { post: Moment; c: ThemeColors }
function WinnerCard({ post, c }: WinnerCardProps) {
  return (
    <div style={{ borderRadius: 18, padding: 3, background: 'linear-gradient(90deg, #F43F5E, #0EA5E9, #F43F5E)', backgroundSize: '200%', animation: 'mp-shimmer 4s linear infinite', marginBottom: 16 }}>
      <div style={{ background: c.card, borderRadius: 16, padding: 16 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: c.amber, color: '#fff', borderRadius: 999, padding: '5px 12px', fontSize: 11, fontWeight: 700, marginBottom: 12 }}>
          🏆 WINNER OF THE WEEK
        </div>
        <MediaPlaceholder height={200} emoji={post.mediaEmoji} label="Winner photo" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, marginBottom: 8 }}>
          <Avatar initials={post.avatar} size={36} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.ink }}>{post.author}</div>
            <div style={{ fontSize: 12, color: c.ink3 }}>{post.time} oldin</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: c.ink2, lineHeight: 1.5, marginBottom: 10 }}>{post.caption}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="heart" size={16} color={c.rose} filled />
          <span style={{ fontSize: 13, fontWeight: 700, color: c.ink }}>{post.likes}</span>
        </div>
      </div>
    </div>
  )
}

interface LeaderboardCardProps { posts: Moment[]; c: ThemeColors }
function LeaderboardCard({ posts, c }: LeaderboardCardProps) {
  const ranked = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 10)
  const badges: Record<number, string> = { 0: '🥇', 1: '🥈', 2: '🥉' }

  return (
    <div style={{ background: c.card, borderRadius: 16, border: `1px solid ${c.border}`, marginBottom: 16, overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px 10px', fontSize: 15, fontWeight: 700, color: c.ink }}>Top 10 Leaderboard</div>
      {ranked.map((post, i) => (
        <div key={post.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: i === 0 ? `${c.amber}18` : 'transparent', borderTop: `1px solid ${c.border}` }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: c.ink3, minWidth: 20, textAlign: 'center' }}>{i + 1}</span>
          <Avatar initials={post.avatar} size={32} />
          <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: c.ink }}>{post.author}</span>
          <span style={{ fontSize: 14 }}>{badges[i] ?? '⭐'}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="heart" size={14} color={c.rose} filled />
            <span style={{ fontSize: 13, fontWeight: 700, color: c.ink }}>{post.likes}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

interface PostCardProps { post: Moment; onLike: (id: number) => void; c: ThemeColors }
function PostCard({ post, onLike, c }: PostCardProps) {
  return (
    <div style={{ background: c.card, borderRadius: 16, border: `1px solid ${c.border}`, padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <Avatar initials={post.avatar} size={36} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.ink }}>{post.author}</div>
          <div style={{ fontSize: 12, color: c.ink3 }}>{post.time} oldin</div>
        </div>
      </div>
      <MediaPlaceholder height={220} emoji={post.mediaEmoji} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, marginBottom: 8 }}>
        <button onClick={() => onLike(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}>
          <Icon name="heart" size={20} color={c.rose} filled={post.liked} />
          <span style={{ fontSize: 14, fontWeight: 700, color: c.ink }}>{post.likes}</span>
        </button>
      </div>
      <p style={{ fontSize: 13, color: c.ink2, lineHeight: 1.5 }}>{post.caption}</p>
    </div>
  )
}

interface UploadModalProps { onClose: () => void; onPost: (p: { emoji: string; caption: string }) => void; c: ThemeColors }
function UploadModal({ onClose, onPost, c }: UploadModalProps) {
  const [emoji, setEmoji]       = useState<string | null>(null)
  const [caption, setCaption]   = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const canShare = !!emoji && caption.trim().length > 0

  function handleShare() {
    if (!canShare || !emoji) return
    setUploading(true)
    let p = 0
    const t = setInterval(() => {
      p += Math.random() * 15 + 5
      if (p >= 100) {
        p = 100
        clearInterval(t)
        setTimeout(() => onPost({ emoji, caption }), 300)
      }
      setProgress(p)
    }, 120)
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(8,15,20,0.5)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'flex-end', animation: 'mp-fade 0.22s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxHeight: '86%', background: c.card, borderRadius: '26px 26px 0 0', boxShadow: '0 -18px 50px rgba(0,0,0,0.3)', animation: 'mp-sheet 0.34s cubic-bezier(0.16,1,0.3,1)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: c.border }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 16px' }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: c.ink }}>Share a Moment</span>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${c.border}`, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="x" size={16} color={c.ink2} />
          </button>
        </div>
        <div style={{ padding: '0 20px 32px', overflowY: 'auto' }}>
          <div style={{ border: `2px dashed ${emoji ? c.primary : c.border}`, borderRadius: 14, background: emoji ? c.primarySoft : 'transparent', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 16, transition: 'all 0.2s' }}>
            {emoji ? <span style={{ fontSize: 48 }}>{emoji}</span> : <Icon name="upload" size={32} color={c.ink3} />}
            <div style={{ fontSize: 13, color: emoji ? c.primaryDark : c.ink3, fontWeight: 600 }}>{emoji ? 'Rasm tanlandi' : 'Media tanlang'}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {UPLOAD_EMOJIS.map(e => (
                <button key={e} onClick={() => setEmoji(e)} style={{ fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 8, outline: emoji === e ? `2px solid ${c.primary}` : 'none' }}>{e}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <textarea value={caption} onChange={e => setCaption(e.target.value.slice(0, 200))} placeholder="Fikringizni yozing..." rows={3} style={{ width: '100%', borderRadius: 12, border: `1px solid ${c.border}`, background: c.bg, color: c.ink, padding: 12, fontSize: 14, resize: 'none', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} />
            <div style={{ textAlign: 'right', fontSize: 12, color: c.ink3, marginTop: 4 }}>{caption.length}/200</div>
          </div>
          {uploading && (
            <div style={{ height: 4, borderRadius: 999, background: c.border, marginBottom: 16, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 999, background: c.primary, width: `${progress}%`, transition: 'width 0.1s linear' }} />
            </div>
          )}
          <button onClick={handleShare} disabled={!canShare || uploading} style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', background: canShare ? c.primary : c.border, color: canShare ? '#fff' : c.ink3, fontSize: 15, fontWeight: 700, cursor: canShare ? 'pointer' : 'default', transition: 'all 0.2s' }}>
            {uploading ? 'Yuklanyapti...' : 'Share Moment'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MomentsPage() {
  const { c } = useTheme()
  const navigate = useNavigate()
  const [posts, setPosts]         = useState<Moment[]>(initialMoments)
  const [period, setPeriod]       = useState<PeriodKey>('Kunlik')
  const [showUpload, setShowUpload] = useState(false)

  function toggleLike(id: number) {
    setPosts(ps => ps.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
  }

  function handlePost({ emoji, caption }: { emoji: string; caption: string }) {
    const newPost: Moment = { id: Date.now(), author: 'Akbar K.', avatar: 'AK', time: '1 daqiqa', caption, likes: 0, liked: false, mediaEmoji: emoji }
    setPosts(ps => [newPost, ...ps])
    setShowUpload(false)
  }

  const winner = [...posts].sort((a, b) => b.likes - a.likes)[0]

  return (
    <div style={{ animation: 'mp-page 0.25s ease', minHeight: '100%' }}>
      <div style={{ padding: '16px 20px 0' }}>
        <button onClick={() => navigate('/home')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: c.card, border: `1px solid ${c.border}`, borderRadius: 999, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: c.ink2, cursor: 'pointer' }}>
          <Icon name="chevron-left" size={16} color={c.ink2} />
          Orqaga
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 16px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: c.ink }}>Park Moments</div>
        <button onClick={() => setShowUpload(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: c.primary, border: 'none', borderRadius: 999, padding: '9px 16px', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
          <Icon name="camera" size={16} color="#fff" />
          Joylash
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 20px', marginBottom: 16 }}>
        {PERIODS.map(p => <Chip key={p} active={period === p} onClick={() => setPeriod(p)}>{p}</Chip>)}
      </div>

      <div style={{ padding: '0 20px 32px' }}>
        {winner && <WinnerCard post={winner} c={c} />}
        <LeaderboardCard posts={posts} c={c} />
        <div style={{ fontSize: 15, fontWeight: 700, color: c.ink, marginBottom: 14 }}>So'nggi Momentlar</div>
        {posts.map(post => <PostCard key={post.id} post={post} onLike={toggleLike} c={c} />)}
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onPost={handlePost} c={c} />}
    </div>
  )
}
