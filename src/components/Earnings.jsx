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

export default function Earnings() {
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
    <div className="white-bg" id="earn" ref={containerRef}>
      <div className="container">
        <div className="section">
          <div className="earn-layout">
            <div className="earn-left reveal-left">
              <div className="s-eye">Compensation</div>
              <div className="earn-big" data-count="20" data-prefix="$" data-slot="true">$20</div>
              <div className="earn-big-sub">guaranteed per video</div>
              <p>Every video pays $20. No conditions, no follower count requirements. If a video takes off, you get more on top. Creators who post consistently bring in $500 to $2,000 a month.</p>
              <a href="https://tally.so/r/eqBJ9l" target="_blank" rel="noopener" className="earn-cta">Apply to the program</a>
            </div>
            <div className="earn-right reveal-right">
              <div className="s-eye" style={{ marginBottom: '14px' }}>View bonuses</div>
              <div className="bonus-grid">
                <div className="bonus-card reveal delay-1">
                  <div className="bonus-views">10K views</div>
                  <div className="bonus-amt" data-count="50" data-prefix="+$">+$50</div>
                </div>
                <div className="bonus-card reveal delay-2">
                  <div className="bonus-views">50K views</div>
                  <div className="bonus-amt" data-count="150" data-prefix="+$">+$150</div>
                </div>
                <div className="bonus-card reveal delay-3">
                  <div className="bonus-views">100K views</div>
                  <div className="bonus-amt" data-count="300" data-prefix="+$">+$300</div>
                </div>
                <div className="bonus-card reveal delay-4">
                  <div className="bonus-views">500K+ views</div>
                  <div className="bonus-amt" data-count="500" data-prefix="+$">+$500</div>
                </div>
              </div>
              <div className="viral-callout reveal delay-2">
                <div className="viral-num" data-count="520" data-prefix="$" data-suffix="+">$520+</div>
                <div className="viral-desc">One viral video pays your base $20 plus up to $500 more in view bonuses</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
