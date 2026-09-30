import { create } from 'zustand'

export const useStore = create((set) => ({
  hovered: -1,
  selected: -1,
  setHovered: (hovered) => set({ hovered }),
  setSelected: (selected) => set({ selected, hovered: -1 }),
}))

// Mutable per-frame values (no re-renders)
export const motion = { t: 0, spin: 0, off: 0, angle: 0, speed: 1, scroll: 0, mouse: { x: 0, y: 0 }, phones: [] }

export const getTier = () => {
  const w = window.innerWidth
  if (w < 700) return { name: 'mobile', phones: 3, particles: 60, dpr: [1, 1.5], radius: 2.1, env: false }
  if (w < 1100) return { name: 'tablet', phones: 4, particles: 120, dpr: [1, 1.75], radius: 3, env: true }
  return { name: 'desktop', phones: Infinity, particles: 220, dpr: [1, 2], radius: 3.6, env: true }
}
