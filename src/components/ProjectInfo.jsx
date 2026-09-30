export default function ProjectInfo({ p, i }) {
  return (
    <>
      <p className="eyebrow">0{i + 1} / Project</p>
      <h2>{p.title}</h2>
      <p className="desc">{p.description}</p>
      {p.highlights?.length > 0 && <ul className="hl">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>}
      <dl>
        <div><dt>Role</dt><dd>{p.role}</dd></div>
        <div><dt>Technologies</dt><dd className="tags">{p.technologies.map((t) => <span key={t}>{t}</span>)}</dd></div>
        <div><dt>Year</dt><dd>{p.year}</dd></div>
      </dl>
      <a className="cta" href={p.url} target="_blank" rel="noreferrer">VIEW PROJECT ↗</a>
      <a className="link" href={p.url} target="_blank" rel="noreferrer">{p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>
    </>
  )
}
