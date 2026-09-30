import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import Phone from './Phone'
import { projects } from '../data/projects'
import { useStore, motion } from '../state'

const { damp, clamp } = MathUtils
const Y = [0.9, -0.8, 0.6, -0.9, 0.3]

export default function PhoneGroup({ tier }) {
  const g = useRef()
  const list = useMemo(() => projects.slice(0, tier.phones), [tier])
  const orbits = useMemo(
    () => list.map((_, i) => i === 0 ? null : {
      a0: ((i - 1) / (list.length - 1)) * Math.PI * 2 + 0.6,
      r: tier.radius + (i % 2) * 0.5, y: Y[i % 5], tilt: (i % 2 ? 1 : -1) * 0.14,
    }), [list, tier])

  useFrame((_, dt) => {
    const sel = useStore.getState().selected, m = motion, p = m.scroll
    m.t += dt
    m.speed = damp(m.speed, sel < 0 ? 1 : 0, 2, dt) // orbit eases to a halt on focus
    m.spin += dt * 0.12 * m.speed
    if (sel < 0) m.off = damp(m.off, clamp((p - 0.15) / 0.4, 0, 1) * Math.PI * 1.3, 2, dt) // scroll rotates the arrangement
    m.angle = m.spin + m.off
    const f = sel < 0 ? 1 : 0
    const aboutShift = p > 0.5 && p < 0.85 && tier.name !== 'mobile' && sel < 0 ? 2.8 : 0
    const o = g.current
    o.rotation.y = damp(o.rotation.y, m.mouse.x * 0.25 * f, 3, dt)
    o.rotation.x = damp(o.rotation.x, -m.mouse.y * 0.12 * f, 3, dt)
    o.position.x = damp(o.position.x, aboutShift, 2, dt)
  })

  return (
    <group ref={g}>
      {list.map((p, i) => (
        <Phone key={i} index={i} project={p} orbit={orbits[i]} scale={i === 0 ? 1.35 : 1} />
      ))}
    </group>
  )
}
