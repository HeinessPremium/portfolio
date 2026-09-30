import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ProjectInfo from './ProjectInfo'
import { projects } from '../data/projects'
import { useStore } from '../state'

export default function ProjectOverlay() {
  const selected = useStore((s) => s.selected)
  const setSelected = useStore((s) => s.setSelected)
  const ref = useRef()
  const p = projects[selected]

  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setSelected(-1)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [setSelected])

  useLayoutEffect(() => {
    if (!p) return
    gsap.fromTo(ref.current.children, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.07, delay: 0.5 })
  }, [selected, p])

  if (!p) return null
  return (
    <aside className="overlay">
      <button className="back" onClick={() => setSelected(-1)}>← BACK</button>
      <div ref={ref} className="panel"><ProjectInfo p={p} i={selected} /></div>
    </aside>
  )
}
