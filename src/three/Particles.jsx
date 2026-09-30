import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { motion } from '../state'

export default function Particles({ count }) {
  const ref = useRef()
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 30
      a[i * 3 + 1] = (Math.random() - 0.5) * 16
      a[i * 3 + 2] = -Math.random() * 14 - 1
    }
    return a
  }, [count])
  useFrame((_, dt) => {
    const r = ref.current
    r.rotation.y += dt * 0.008
    r.position.y = MathUtils.damp(r.position.y, motion.scroll * 3, 2, dt)
    r.position.x = MathUtils.damp(r.position.x, -motion.mouse.x * 0.6, 1.5, dt)
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#9db4ff" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}
