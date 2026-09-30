import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useStore, motion } from '../state'

const { damp } = THREE.MathUtils
const W = 1, H = 2.05

function roundedRect(w, h, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0)
  s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2)
  s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI)
  s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
  return s
}

// Shared geometries (built once)
const bodyGeo = new THREE.ExtrudeGeometry(roundedRect(W, H, 0.16), {
  depth: 0.08, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 3, curveSegments: 12,
})
bodyGeo.translate(0, 0, -0.04)
const SW = W - 0.09, SH = H - 0.09
const screenGeo = new THREE.ShapeGeometry(roundedRect(SW, SH, 0.12), 12)
{
  const p = screenGeo.attributes.position, uv = screenGeo.attributes.uv
  for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / SW + 0.5, p.getY(i) / SH + 0.5)
}
const pillGeo = new THREE.ShapeGeometry(roundedRect(0.28, 0.07, 0.035), 8)

const glowTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 128
  const x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(140,170,255,1)'); g.addColorStop(1, 'rgba(140,170,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
})()

function useScreen(p, i) {
  return useMemo(() => {
    if (p.image) {
      const t = new THREE.TextureLoader().load(p.image)
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4
      return t
    }
    const c = document.createElement('canvas'); c.width = 512; c.height = 1024
    const x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 512, 1024)
    g.addColorStop(0, p.accent); g.addColorStop(1, '#05060a')
    x.fillStyle = g; x.fillRect(0, 0, 512, 1024)
    x.fillStyle = 'rgba(255,255,255,.08)'
    for (let k = 0; k < 4; k++) x.fillRect(48, 560 + k * 92, 416, 64)
    x.fillStyle = '#fff'; x.font = '700 52px sans-serif'; x.fillText(p.title, 48, 200, 416)
    x.font = '300 220px sans-serif'; x.fillText('0' + (i + 1), 40, 470)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4
    return t
  }, [p, i])
}

export default function Phone({ index, project, orbit, scale = 1 }) {
  const g = useRef(), body = useRef(), scr = useRef(), glow = useRef()
  const v = useRef({ h: 0, r: 0, d: 1, px: 0, py: 0 })
  const map = useScreen(project, index)
  const label = useStore((s) => s.hovered === index && s.selected === -1)
  const { setHovered, setSelected } = useStore.getState()

  useFrame((_, dt) => {
    const { hovered, selected } = useStore.getState()
    const isS = selected === index, isH = hovered === index, s = v.current
    s.h = damp(s.h, isH || isS ? 1 : 0, 6, dt) // hover amount
    s.r = damp(s.r, isS ? 1 : isH ? 0.7 : 0, 5, dt) // face-viewer amount
    s.d = damp(s.d, selected >= 0 ? (isS ? 1 : 0.12) : hovered >= 0 ? (isH ? 1 : 0.35) : 1, 5, dt) // dimming
    const k = selected >= 0 ? 0 : 1
    const lag = 1.5 + index * 0.3 // each phone follows the mouse with its own delay
    s.px = damp(s.px, motion.mouse.x * 0.35 * (1 + index * 0.2) * k, lag, dt)
    s.py = damp(s.py, motion.mouse.y * 0.25 * (1 + index * 0.2) * k, lag, dt)

    let x = 0, y = Math.sin(motion.t * 2 + index * 1.7) * 0.1, z = 0, ry = 0
    if (orbit) {
      const a = orbit.a0 + motion.angle
      x = Math.cos(a) * orbit.r; z = Math.sin(a) * orbit.r * 0.8 - 0.6; y += orbit.y
      ry = -Math.cos(a) * 0.7
    }
    g.current.position.set(x + s.px, y + s.py, z + s.h * 0.9)
    g.current.rotation.set(-s.py * 0.3, ry * (1 - s.r) + s.px * 0.3, (orbit ? orbit.tilt : 0) * (1 - s.r))
    g.current.scale.setScalar(scale * (1 + s.h * 0.1))

    body.current.opacity = 0.3 + 0.7 * s.d
    body.current.emissiveIntensity = s.h * 0.35
    scr.current.color.setScalar((0.8 + s.h * 0.5) * (0.2 + 0.8 * s.d))
    glow.current.opacity = s.h * 0.55
    motion.phones[index] = g.current
  })

  return (
    <group
      ref={g}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(index); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(-1); document.body.style.cursor = '' }}
      onClick={(e) => { e.stopPropagation(); document.body.style.cursor = ''; setSelected(index) }}
    >
      <mesh geometry={bodyGeo}>
        <meshStandardMaterial ref={body} color="#1b1d24" metalness={1} roughness={0.22} transparent emissive="#6f8cff" />
      </mesh>
      <mesh geometry={screenGeo} position={[0, 0, 0.062]}>
        <meshBasicMaterial ref={scr} map={map} toneMapped={false} />
      </mesh>
      <mesh geometry={screenGeo} position={[0, 0, 0.064]}>
        <meshStandardMaterial color="#000" metalness={1} roughness={0.05} transparent opacity={0.1} depthWrite={false} />
      </mesh>
      <mesh geometry={pillGeo} position={[0, H / 2 - 0.1, 0.066]}>
        <meshBasicMaterial color="#000" />
      </mesh>
      <mesh position={[0, 0, -0.12]} raycast={() => null}>
        <planeGeometry args={[2.4, 3.6]} />
        <meshBasicMaterial ref={glow} map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {label && (
        <Html position={[0.85, 0.95, 0.1]} style={{ pointerEvents: 'none' }}>
          <div className="label"><span>0{index + 1}</span>{project.title}</div>
        </Html>
      )}
    </group>
  )
}
