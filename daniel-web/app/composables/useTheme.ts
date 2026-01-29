/**
 * 主题管理 Composable
 */

export type ThemeType = 'light' | 'dark' | 'hero'

export function useTheme() {
  const theme = useState<ThemeType>('theme', () => 'hero')

  const setTheme = (newTheme: ThemeType) => {
    theme.value = newTheme

    if (import.meta.client) {
      document.documentElement.className = `theme-${newTheme}`
      localStorage.setItem('dm-theme', newTheme)
    }
  }

  const initTheme = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('dm-theme') as ThemeType
      if (saved && ['light', 'dark', 'hero'].includes(saved)) {
        setTheme(saved)
      } else {
        setTheme('hero')
      }
    }
  }

  const toggleTheme = () => {
    const themes: ThemeType[] = ['light', 'dark', 'hero']
    const currentIndex = themes.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return {
    theme: readonly(theme),
    setTheme,
    initTheme,
    toggleTheme,
  }
}
