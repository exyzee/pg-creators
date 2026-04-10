import { useEffect, useCallback, useState, useRef } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import WhatYouDo from './components/WhatYouDo'
import Niches from './components/Niches'
import Earnings from './components/Earnings'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Perks from './components/Perks'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import ReadinessGate from './components/ReadinessGate'

const TALLY_URL = 'https://tally.so/r/eqBJ9l'
const TRACKED_SECTIONS = ['what', 'earn', 'features', 'faq']

function App() {
  const [viewed, setViewed] = useState({ what: false, earn: false, features: false, faq: false })
  const [gateOpen, setGateOpen] = useState(false)
  const viewedRef = useRef(viewed)
  viewedRef.current = viewed

  // ── SECTION DWELL-TIME TRACKING ──
  // Marks a section as "viewed" after 1.5 s of 30 % visibility
  useEffect(() => {
    const timers = {}
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (!TRACKED_SECTIONS.includes(id)) return
          if (entry.isIntersecting && !viewedRef.current[id]) {
            timers[id] = setTimeout(() => {
              setViewed((prev) => ({ ...prev, [id]: true }))
            }, 1500)
          } else {
            clearTimeout(timers[id])
          }
        })
      },
      { threshold: 0.3 }
    )

    const t = setTimeout(() => {
      TRACKED_SECTIONS.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(t)
      Object.values(timers).forEach(clearTimeout)
      observer.disconnect()
    }
  }, [])

  // ── APPLY CLICK — gate or pass-through ──
  const handleApplyClick = useCallback(() => {
    if (TRACKED_SECTIONS.every((id) => viewedRef.current[id])) {
      window.open(TALLY_URL, '_blank', 'noopener')
    } else {
      setGateOpen(true)
    }
  }, [])
  // ── SCROLL REVEAL ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    document
      .querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // ── CONFETTI ON APPLY CLICK ──
  useEffect(() => {
    function burst(cx, cy) {
      const cols = ['#007AFF', '#34C759', '#FF9F0A', '#FF453A', '#BF5AF2', '#fff', '#FFD60A']
      for (let i = 0; i < 72; i++) {
        const el = document.createElement('div')
        const s = 4 + Math.random() * 7
        el.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${s}px;height:${s}px;background:${cols[i % cols.length]};border-radius:${Math.random() > 0.45 ? '50%' : '2px'};pointer-events:none;z-index:99999;`
        document.body.appendChild(el)
        const a = (Math.PI * 2 * i) / 72 + (Math.random() - 0.5) * 0.9
        const spd = 120 + Math.random() * 260
        const vx = Math.cos(a) * spd,
          vy = Math.sin(a) * spd - 220
        const spin = (Math.random() - 0.5) * 900
        let t = 0
        ;(function tick() {
          t += 0.018
          el.style.left = cx + vx * t + 'px'
          el.style.top = cy + vy * t + 320 * t * t + 'px'
          el.style.opacity = Math.max(0, 1 - t * 1.3)
          el.style.transform = `rotate(${spin * t}deg)`
          if (parseFloat(el.style.opacity) > 0) requestAnimationFrame(tick)
          else el.remove()
        })()
      }
    }

    function handleClick(e) {
      const btn = e.currentTarget
      const r = btn.getBoundingClientRect()
      burst(r.left + r.width / 2, r.top + r.height / 2)
    }

    // Small delay to let the DOM render
    const timer = setTimeout(() => {
      document.querySelectorAll('.cta-inner .h-btn-primary,.earn-cta').forEach((btn) => {
        btn.addEventListener('click', handleClick)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      document.querySelectorAll('.cta-inner .h-btn-primary,.earn-cta').forEach((btn) => {
        btn.removeEventListener('click', handleClick)
      })
    }
  }, [])

  // ── MAGNETIC BUTTONS ──
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return

    const btns = document.querySelectorAll('.h-btn-primary,.nav-cta,.earn-cta')

    function onMove(e) {
      const btn = e.currentTarget
      const r = btn.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * 0.18
      const y = (e.clientY - r.top - r.height / 2) * 0.22
      btn.style.transition = 'transform 0.1s,box-shadow 0.32s cubic-bezier(0.16,1,0.3,1)'
      btn.style.transform = `translate(${x}px,${y}px) scale(1.02)`
    }

    function onLeave(e) {
      const btn = e.currentTarget
      btn.style.transition =
        'transform 0.55s cubic-bezier(0.16,1,0.3,1),box-shadow 0.32s cubic-bezier(0.16,1,0.3,1)'
      btn.style.transform = ''
    }

    btns.forEach((btn) => {
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
    })

    return () => {
      btns.forEach((btn) => {
        btn.removeEventListener('mousemove', onMove)
        btn.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  // ── CARD TILT ──
  useEffect(() => {
    const cards = document.querySelectorAll('.icon-card, .bonus-card, .perk-card, .feature-card')

    function onMove(e) {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `translateY(-5px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`
    }

    function onLeave(e) {
      const card = e.currentTarget
      card.style.transform = ''
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s'
    }

    function onEnter(e) {
      const card = e.currentTarget
      card.style.transition = 'transform 0.1s, box-shadow 0.3s'
    }

    cards.forEach((card) => {
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      card.addEventListener('mouseenter', onEnter)
    })

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
        card.removeEventListener('mouseenter', onEnter)
      })
    }
  }, [])

  // ── EASTER EGGS ──
  useEffect(() => {
    function eggToast(emoji, msg) {
      const wrap = document.createElement('div')
      wrap.style.cssText = `
        position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px) scale(0.94);
        background:#1D1D1F;color:#fff;border-radius:999px;
        padding:10px 22px;font-size:14px;font-weight:600;font-family:'Inter',sans-serif;
        display:flex;align-items:center;gap:9px;z-index:99999;
        box-shadow:0 8px 40px rgba(0,0,0,0.35);
        transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),opacity 0.4s;
        opacity:0;pointer-events:none;white-space:nowrap;
      `
      wrap.innerHTML = `<span style="font-size:18px">${emoji}</span><span>${msg}</span>`
      document.body.appendChild(wrap)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          wrap.style.opacity = '1'
          wrap.style.transform = 'translateX(-50%) translateY(0) scale(1)'
        })
      )
      setTimeout(() => {
        wrap.style.opacity = '0'
        wrap.style.transform = 'translateX(-50%) translateY(12px) scale(0.95)'
        setTimeout(() => wrap.remove(), 450)
      }, 3200)
    }

    function greenBurst(cx, cy) {
      const cols = ['#34C759', '#30D158', '#2ECC71', '#FFD60A', '#fff']
      for (let i = 0; i < 80; i++) {
        const el = document.createElement('div')
        const s = 5 + Math.random() * 9
        el.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${s}px;height:${s}px;
          background:${cols[i % cols.length]};border-radius:${Math.random() > 0.4 ? '50%' : '3px'};
          pointer-events:none;z-index:99999;`
        document.body.appendChild(el)
        const a = (Math.PI * 2 * i) / 80 + (Math.random() - 0.5) * 1.2
        const spd = 80 + Math.random() * 220
        const vx = Math.cos(a) * spd,
          vy = Math.sin(a) * spd - 260
        const spin = (Math.random() - 0.5) * 800
        let t = 0
        ;(function tick() {
          t += 0.02
          el.style.left = cx + vx * t + 'px'
          el.style.top = cy + vy * t + 300 * t * t + 'px'
          el.style.opacity = Math.max(0, 1 - t * 1.1)
          el.style.transform = `rotate(${spin * t}deg)`
          if (parseFloat(el.style.opacity) > 0) requestAnimationFrame(tick)
          else el.remove()
        })()
      }
    }

    // ① KONAMI CODE
    const konami = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
    ]
    let ki = 0
    function onKonami(e) {
      if (e.key === konami[ki]) {
        ki++
        if (ki === konami.length) {
          ki = 0
          const cx = window.innerWidth / 2,
            cy = window.innerHeight / 2
          for (let pass = 0; pass < 3; pass++) {
            setTimeout(() => {
              const cols = ['#007AFF', '#34C759', '#FF9F0A', '#FF453A', '#BF5AF2', '#fff', '#FFD60A']
              for (let i = 0; i < 90; i++) {
                const el = document.createElement('div')
                const s = 5 + Math.random() * 10
                el.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${s}px;height:${s}px;
                  background:${cols[i % cols.length]};border-radius:${Math.random() > 0.4 ? '50%' : '2px'};
                  pointer-events:none;z-index:99999;`
                document.body.appendChild(el)
                const a = (Math.PI * 2 * i) / 90 + (Math.random() - 0.5) * 0.7
                const spd = 140 + Math.random() * 300
                const vx = Math.cos(a) * spd,
                  vy = Math.sin(a) * spd - 250
                const spin = (Math.random() - 0.5) * 900
                let t = 0
                ;(function tick() {
                  t += 0.018
                  el.style.left = cx + vx * t + 'px'
                  el.style.top = cy + vy * t + 320 * t * t + 'px'
                  el.style.opacity = Math.max(0, 1 - t * 1.1)
                  el.style.transform = `rotate(${spin * t}deg)`
                  if (parseFloat(el.style.opacity) > 0) requestAnimationFrame(tick)
                  else el.remove()
                })()
              }
            }, pass * 220)
          }
          eggToast('🎮', 'Cheat code unlocked. Now go make a video.')
        }
      } else {
        ki = e.key === konami[0] ? 1 : 0
      }
    }
    document.addEventListener('keydown', onKonami)

    // ② Click $520+ five times → money rain
    const viralNum = document.querySelector('.viral-num')
    let vc = 0,
      vt
    function onViralClick() {
      vc++
      clearTimeout(vt)
      vt = setTimeout(() => {
        vc = 0
      }, 1800)
      if (vc >= 5) {
        vc = 0
        const r = viralNum.getBoundingClientRect()
        greenBurst(r.left + r.width / 2, r.top + r.height / 2)
        eggToast('💸', "One viral video and you're set.")
      }
    }
    if (viralNum) {
      viralNum.style.cursor = 'pointer'
      viralNum.addEventListener('click', onViralClick)
    }

    // ③ Type "getpaid" anywhere
    let typed = ''
    const secret = 'getpaid'
    function onKeypress(e) {
      if (
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA'
      )
        return
      typed += e.key.toLowerCase()
      if (typed.length > secret.length) typed = typed.slice(-secret.length)
      if (typed === secret) {
        typed = ''
        const cx = window.innerWidth / 2,
          cy = window.innerHeight * 0.4
        greenBurst(cx, cy)
        eggToast('🤑', "You're already thinking like a creator.")
      }
    }
    document.addEventListener('keypress', onKeypress)

    // ⑤ Triple-click logo
    const logoImg = document.querySelector('.logo-img')
    let lc = 0,
      lt
    function onLogoClick(e) {
      e.preventDefault()
      lc++
      clearTimeout(lt)
      lt = setTimeout(() => {
        lc = 0
      }, 600)
      if (lc >= 3) {
        lc = 0
        logoImg.style.transition = 'transform 0.7s cubic-bezier(0.16,1,0.3,1)'
        logoImg.style.transform = 'rotate(720deg) scale(1.3)'
        setTimeout(() => {
          logoImg.style.transform = ''
          setTimeout(() => {
            logoImg.style.transition = ''
          }, 700)
        }, 750)
        eggToast('🛝', "It's Playground. We had to.")
      }
    }
    if (logoImg) {
      logoImg.addEventListener('click', onLogoClick)
    }

    return () => {
      document.removeEventListener('keydown', onKonami)
      document.removeEventListener('keypress', onKeypress)
      if (viralNum) viralNum.removeEventListener('click', onViralClick)

      if (logoImg) logoImg.removeEventListener('click', onLogoClick)
    }
  }, [])

  return (
    <>
      <Nav onApplyClick={handleApplyClick} />
      <Hero />
      <StatsBar />
      <WhatYouDo />
      <Niches />
      <Earnings onApplyClick={handleApplyClick} />
      <Features />
      <HowItWorks />
      <Perks />
      <FAQ />
      <FinalCTA onApplyClick={handleApplyClick} />
      <Footer />
      <ReadinessGate
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        viewed={viewed}
      />
    </>
  )
}

export default App
