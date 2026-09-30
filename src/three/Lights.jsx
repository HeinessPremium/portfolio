import { Environment, Lightformer } from '@react-three/drei'

export default function Lights({ env }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <pointLight position={[-6, 2, -3]} intensity={60} color="#5b6dff" />
      <pointLight position={[6, -2, -2]} intensity={45} color="#ff7a59" />
      {env && (
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 5, -5]} scale={[12, 3, 1]} />
          <Lightformer form="rect" intensity={2} position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
          <Lightformer form="rect" intensity={1.5} position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        </Environment>
      )}
    </>
  )
}
