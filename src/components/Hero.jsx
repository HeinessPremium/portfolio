import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const root = useRef()
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ch', { yPercent: 110, duration: 1.4, ease: 'expo.out', stagger: 0.05, delay: 0.3 })
      gsap.from('.sub, .hint', { opacity: 0, y: 20, duration: 1.2, delay: 1.1, stagger: 0.15 })
      gsap.to('.hero-inner', {
        yPercent: -25, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 30%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section id="top" ref={root} className="hero">
      <div className="hero-inner">
        <h1>
          {['ENIOLAMIDE', 'O.'].map((w) => (
            <span className="word" key={w}>
              {[...w].map((c, i) => <span className="mask" key={i}><span className="ch">{c}</span></span>)}
            </span>
          ))}
        </h1>
        <p className="sub">CREATIVE DEVELOPER</p>
      </div>
      <span className="hint">SCROLL</span>
    </section>
  )
}
