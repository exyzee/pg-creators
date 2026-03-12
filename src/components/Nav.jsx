import { useEffect, useRef, useState } from 'react'

export default function Nav() {
  const navRef = useRef(null)
  const liveCountRef = useRef(null)
  const countRef = useRef(40 + Math.floor(Math.random() * 22))

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

  // ── Live viewer count (vertical roll) ──
  useEffect(() => {
    const wrap = liveCountRef.current
    if (!wrap) return

    function rollTo(newVal) {
      const n = countRef.current
      if (newVal === n) return
      const goingUp = newVal > n
      const outAnim = goingUp ? 'rollUpOut' : 'rollDownOut'
      const inAnim = goingUp ? 'rollUpIn' : 'rollDownIn'
      const dur = '0.38s cubic-bezier(0.16,1,0.3,1) forwards'

      const cur = wrap.querySelector('span')
      if (cur) cur.style.animation = `${outAnim} ${dur}`

      const next = document.createElement('span')
      next.textContent = newVal
      next.style.animation = `${inAnim} ${dur}`
      wrap.appendChild(next)

      countRef.current = newVal
      setTimeout(() => {
        wrap.innerHTML = `<span>${newVal}</span>`
      }, 400)
    }

    const iv = setInterval(() => {
      const n = countRef.current
      const delta = Math.floor(Math.random() * 5) - 2
      const newN = Math.max(28, Math.min(84, n + delta))
      if (newN !== n) rollTo(newN)
    }, 3800)

    return () => clearInterval(iv)
  }, [])

  return (
    <div className="nav-wrap">
      <div className="nav-glass" id="navGlass" ref={navRef}>
        <a href="https://playground.com" target="_blank" rel="noopener" className="logo">
          <img src="/Logo.svg" className="logo-img" alt="Playground logo" />
          <span className="logo-name">Playground</span>
          <span className="nav-live-badge">
            <span className="nav-live-dot"></span>
            <span className="nav-live-num" id="liveCountWrap" ref={liveCountRef}>
              <span>{countRef.current}</span>
            </span>
            <span>viewing</span>
          </span>
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
