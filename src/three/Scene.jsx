import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import Lights from './Lights'
import Particles from './Particles'
import PhoneGroup from './PhoneGroup'
import CameraController from './CameraController'
import { getTier, useStore } from '../state'

export default function Scene() {
  const tier = useMemo(getTier, [])
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 1 }}
      dpr={tier.dpr}
      camera={{ fov: 40, position: [0, 0.3, 9.5], near: 0.1, far: 60 }}
      gl={{ antialias: tier.name !== 'mobile', alpha: true, powerPreference: 'high-performance' }}
      onPointerMissed={() => { const s = useStore.getState(); if (s.selected >= 0) s.setSelected(-1) }}
    >
      <fog attach="fog" args={['#05060a', 12, 28]} />
      <Suspense fallback={null}>
        <Lights env={tier.env} />
        <PhoneGroup tier={tier} />
        <Particles count={tier.particles} />
        <CameraController tier={tier} />
      </Suspense>
    </Canvas>
  )
}
