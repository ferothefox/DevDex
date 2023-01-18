import create from 'zustand'

interface ComposerStore {
  composerActive: boolean
  composerData: {
    title: string
    content: string
    tags: Array<{ name: string }>
  }
  setComposerActive: (active: boolean) => void
  setComposerData: (composerData: {
    title: string
    content: string
    tags: Array<{ name: string }>
  }) => void
}

export const useComposerStore = create<ComposerStore>(set => ({
  composerActive: false,
  composerData: {
    title: '',
    content: '',
    tags: [],
  },
  setComposerActive: (active: boolean) => set({ composerActive: active }),
  setComposerData: (composerData: {
    title: string
    content: string
    tags: Array<{ name: string }>
  }) => set({ composerData }),
}))
