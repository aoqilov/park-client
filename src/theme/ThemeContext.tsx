import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ThemeColors, LIGHT, DARK } from './tokens'

export type ThemeMode = 'light' | 'dark'

export interface ThemeContextType {
  mode:    ThemeMode
  c:       ThemeColors
  isDark:  boolean
  toggle:  () => void
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

function getInitialMode(): ThemeMode {
  const stored = localStorage.getItem('mp-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)

  useEffect(() => {
    localStorage.setItem('mp-theme', mode)
    document.documentElement.setAttribute('data-theme', mode)
    document.body.style.backgroundColor = mode === 'dark' ? DARK.bg : LIGHT.bg
  }, [mode])

  const toggle = () => setMode(m => (m === 'light' ? 'dark' : 'light'))
  const c: ThemeColors = mode === 'dark' ? DARK : LIGHT

  return (
    <ThemeContext.Provider value={{ mode, c, isDark: mode === 'dark', toggle, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
