import { useEffect, useRef } from 'react'

function runCountUp(el) {
  const target = parseInt(el.dataset.count)
  const prefix = el.dataset.prefix || ''
  const suffix = el.dataset.suffix || ''
  const isSlot = el.dataset.slot === 'true'

  if (isSlot) {
    const total = 2000
    const settleAt = total * 0.6
    let elapsed = 0
    const tick = setInterval(() => {
      elapsed += 40
      if (elapsed < settleAt) {
        el.textContent = prefix + Math.floor(Math.random() * (target * 3 + 10)) + suffix
      } else if (elapsed < total) {
        const prog = (elapsed - settleAt) / (total - settleAt)
        const spread = Math.max(1, Math.floor(target * (1 - prog) * 0.9))
        const val = Math.max(0, target - spread + Math.floor(Math.random() * spread * 2))
        el.textContent = prefix + val + suffix
      } else {
        el.textContent = prefix + target + suffix
        clearInterval(tick)
      }
    }, 40)
  } else {
    let start = 0
    const duration = 1300
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = prefix + Math.floor(eased * target) + suffix
      if (p < 1) requestAnimationFrame(step)
      else el.textContent = prefix + target + suffix
    }
    requestAnimationFrame(step)
  }
}

export default function StatsBar() {
  const containerRef = useRef(null)

  useEffect(() => {
    const countEls = containerRef.current.querySelectorAll('[data-count]')
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runCountUp(e.target)
            countObserver.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    countEls.forEach((el) => countObserver.observe(el))
    return () => countObserver.disconnect()
  }, [])

  return (
    <div className="stats-bar" ref={containerRef}>
      <div className="stats-inner">
        <div className="stat reveal delay-1">
          <div className="stat-num" data-count="20" data-prefix="$">$20</div>
          <div className="stat-lbl">Guaranteed per video</div>
        </div>
        <div className="stat reveal delay-2">
          <div className="stat-num">$500+</div>
          <div className="stat-lbl">Per viral video</div>
        </div>
        <div className="stat reveal delay-3">
          <div className="stat-num">10M+</div>
          <div className="stat-lbl">Playground users worldwide</div>
        </div>
      </div>
    </div>
  )
}
