import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'dark' | 'cream'

const THEME_KEY = 'living-cv-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(THEME_KEY)
  return stored === 'cream' ? 'cream' : 'dark'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('theme-transition')
    root.setAttribute('data-theme', theme)
    window.localStorage.setItem(THEME_KEY, theme)
    const timer = window.setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 600)
    return () => window.clearTimeout(timer)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'cream' : 'dark'))
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'تغییر به تم کرم' : 'تغییر به تم تیره'}
      title={theme === 'dark' ? 'تم کرم' : 'تم تیره'}
      className="no-print fixed top-4 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-lg backdrop-blur-md transition-colors hover:bg-surface-hover print:hidden"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
