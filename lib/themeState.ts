import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ThemeStore {
  theme: 'light' | 'dark'
  system: boolean
  toggleSystem: () => void
  switchTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      set => ({
        theme: 'dark',
        system: true,
        toggleSystem: () => set(state => ({ system: !state.system })),
        switchTheme: () =>
          set(state => ({
            theme: state.theme === 'dark' ? 'light' : 'dark',
          })),
      }),
      {
        name: 'ThemeStore',
      }
    )
  )
)
