import { useRef } from 'react'
import useReveal from './useReveal'

const svg = (children, fill) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
)

const links = [
  { label: 'justeniolamide@gmail.com', href: 'mailto:justeniolamide@gmail.com', name: 'Email',
    icon: svg(<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>) },
  { label: '+234 706 843 7700', href: 'tel:+2347068437700', name: 'Phone',
    icon: svg(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />) },
  { label: 'github.com/heinesspremium', href: 'https://github.com/heinesspremium', name: 'GitHub', ext: true,
    icon: svg(<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />, true) },
  { label: 'x.com/eniolamitide', href: 'https://x.com/eniolamitide', name: 'X', ext: true,
    icon: svg(<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />, true) },
]

export default function Contact() {
  const ref = useRef()
  useReveal(ref)
  return (
    <section id="contact" className="block center">
      <div ref={ref} className="col">
        <p className="eyebrow">03 — Contact</p>
        <h2>Let's build something.</h2>
        <p>Tap an icon to reach me. Hover to see the details.</p>
        <div className="socials">
          {links.map((l) => (
            <a key={l.name} href={l.href} aria-label={`${l.name}: ${l.label}`} {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
              {l.icon}<span>{l.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
