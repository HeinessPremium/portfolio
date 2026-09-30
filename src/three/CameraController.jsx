import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore, motion } from '../state'

const { damp, clamp, smootherstep } = THREE.MathUtils
// [scroll progress, camera position, look-at]
const keys = [
  [0, [0, 0.3, 9.5], [0, 0, 0]],
  [0.33, [0, 0.4, 7.5], [0, 0, 0]],
  [0.66, [-1, 0, 11], [1.4, 0, 0]],
  [1, [0, -0.5, 14.5], [0, 0, 0]],
]
const tmp = new THREE.Vector3(), cp = new THREE.Vector3(), cl = new THREE.Vector3(), look = new THREE.Vector3()

export default function CameraController({ tier }) {
  useFrame(({ camera }, dt) => {
    const sel = useStore.getState().selected, mob = tier.name === 'mobile', ph = motion.phones[sel]
    if (sel >= 0 && ph) {
      ph.getWorldPosition(tmp)
      cp.set(tmp.x, tmp.y + (mob ? -0.2 : 0.1), tmp.z + (mob ? 5 : 3.6))
      cl.set(tmp.x + (mob ? 0 : 1.1), tmp.y + (mob ? -1.1 : 0), tmp.z) // phone sits left of the info panel
    } else {
      const p = motion.scroll
      let i = 0
      while (i < keys.length - 2 && p > keys[i + 1][0]) i++
      const [p0, a0, l0] = keys[i], [p1, a1, l1] = keys[i + 1]
      const t = smootherstep(clamp((p - p0) / (p1 - p0), 0, 1), 0, 1)
      cp.set(...a0).lerp(tmp.set(...a1), t)
      cl.set(...l0).lerp(tmp.set(...l1), t)
      if (mob) { cp.z *= 1.3; cl.x = 0 }
    }
    const k = sel >= 0 ? 2.2 : 2.5
    camera.position.set(damp(camera.position.x, cp.x, k, dt), damp(camera.position.y, cp.y, k, dt), damp(camera.position.z, cp.z, k, dt))
    look.set(damp(look.x, cl.x, k, dt), damp(look.y, cl.y, k, dt), damp(look.z, cl.z, k, dt))
    camera.lookAt(look)
  })
  return null
}
