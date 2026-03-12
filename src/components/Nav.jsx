import { useEffect, useRef } from 'react'

export default function Nav() {
  const navRef = useRef(null)

  // ── Nav scroll glass effect ──
  useEffect(() => {
    const nav = navRef.current
    const heroEl = document.querySelector('.hero-container')
    function updateNav() {
      const threshold = heroEl ? heroEl.offsetHeight * 0.15 : 80
      nav.classList.toggle('scrolled', window.scrollY > threshold)
    }
    window.addEventListener('scroll', updateNav, { passive: true })
    updateNav()
    return () => window.removeEventListener('scroll', updateNav)
  }, [])

  return (
    <div className="nav-wrap">
      <div className="nav-glass" id="navGlass" ref={navRef}>
        <a href="https://playground.com" target="_blank" rel="noopener" className="logo">
          <img src="/Logo.svg" className="logo-img" alt="Playground logo" />
          <span className="logo-name">Playground</span>
        </a>
        <div className="nav-links">
          <a href="#what" className="nav-link">Program</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#earn" className="nav-link">Earnings</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="https://tally.so/r/eqBJ9l" target="_blank" rel="noopener" className="nav-cta">Apply now</a>
        </div>
      </div>
    </div>
  )
}
