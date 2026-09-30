const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Navbar() {
  return (
    <header className="nav">
      <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>EO.</a>
      <nav>{['work', 'about', 'contact'].map((id) => <button key={id} onClick={() => go(id)}>{id}</button>)}</nav>
    </header>
  )
}
