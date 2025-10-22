import { create } from "zustand"

type Store = {
  token: string | null
  setToken: (token: string | null) => void
  initializeToken: () => void
  clearToken: () => void
}

export const useTokenStore = create<Store>((set) => ({
  token: null,
  setToken: (token: string | null) => {
    if (typeof window !== 'undefined' && token) {
      localStorage.setItem('token', token)
    }
    set({ token })
  },
  clearToken: () => {
    localStorage.removeItem('token')
    set({token: null})
  },
  initializeToken: () => {
    const stored = localStorage.getItem('token')
    set({ token: stored })
  }
}))