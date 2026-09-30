import { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Contact from './components/Contact'
import ProjectOverlay from './components/ProjectOverlay'
import { motion, useStore } from './state'

const Scene = lazy(() => import('./three/Scene'))

export default function App() {
  const selected = useStore((s) => s.selected)

  useEffect(() => {
    const onScroll = () => {
      const m = document.documentElement.scrollHeight - innerHeight
      motion.scroll = m > 0 ? scrollY / m : 0
    }
    const onMove = (e) => {
      motion.mouse.x = (e.clientX / innerWidth) * 2 - 1
      motion.mouse.y = -((e.clientY / innerHeight) * 2 - 1)
    }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('pointermove', onMove)
    onScroll()
    return () => { removeEventListener('scroll', onScroll); removeEventListener('pointermove', onMove) }
  }, [])

  useEffect(() => { document.body.style.overflow = selected >= 0 ? 'hidden' : '' }, [selected])

  return (
    <>
      <Suspense fallback={null}><Scene /></Suspense>
      <Navbar />
      <main><Hero /><Work /><About /><Contact /></main>
      <ProjectOverlay />
    </>
  )
}
