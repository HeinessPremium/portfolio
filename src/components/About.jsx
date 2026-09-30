import { useRef } from 'react'
import useReveal from './useReveal'

export default function About() {
  const ref = useRef()
  useReveal(ref)
  return (
    <section id="about" className="block">
      <div ref={ref} className="col">
        <p className="eyebrow">02 — About</p>
        <h2>Interfaces that feel alive.</h2>
        <p>I'm Eniolamide, a creative developer building immersive, performance-minded web experiences. If building fast and building great is your goal, you're in the right place. Let's make some magic together.</p>
        <p className="muted">React · Three.js · WebGL · GSAP · Node.js</p>
      </div>
    </section>
  )
}
