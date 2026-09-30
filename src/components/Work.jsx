import { projects } from '../data/projects'
import { useStore } from '../state'

export default function Work() {
  const setSelected = useStore((s) => s.setSelected)
  return (
    <section id="work" className="work">
      <div className="sticky">
        <p className="eyebrow">01 — Selected Work</p>
        <h2>Selected<br />Work</h2>
        <ul>
          {projects.map((p, i) => (
            <li key={i}><button onClick={() => setSelected(i)}><span>0{i + 1}</span>{p.title}<em>{p.year}</em></button></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
