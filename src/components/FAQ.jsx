import { useState, useEffect } from 'react'

const faqs = [
  {
    q: 'Do I need design or tech experience?',
    a: 'Nope. We walk you through everything. The only thing you need is a willingness to make videos and post them consistently.',
  },
  {
    q: 'How much time does this take?',
    a: 'Around 5 to 7 hours a week. Each video usually takes 30 to 60 minutes to make and post. You pick your own hours.',
  },
  {
    q: 'How and when do I get paid?',
    a: '$20 per video, paid weekly through PayPal. View bonuses are calculated monthly. Active creators usually make between $500 and $2,000 a month.',
  },
  {
    q: 'Do I need a new social media account?',
    a: "Yes, you'll set up a new account just for Playground content. We'll help you get it started.",
  },
  {
    q: 'Is this a job or internship?',
    a: "Neither. It's a paid creator program with no office and no fixed hours. Think of it like freelance but with a guaranteed rate per video.",
  },
  {
    q: 'How many spots are available?',
    a: 'We take a limited number of creators per cohort. Applications are reviewed on a rolling basis so the sooner you apply, the better.',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(-1)
  const [revealed, setRevealed] = useState(false)

  // Once the section scrolls into view, lock the revealed state so
  // re-renders from toggling openIdx don't reset the reveal animation.
  useEffect(() => {
    const el = document.getElementById('faq')
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          obs.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function toggle(i) {
    setOpenIdx((prev) => (prev === i ? -1 : i))
  }

  return (
    <div className="white-bg" id="faq">
      <div className="container">
        <div className="section">
          <div className="s-head centered reveal">
            <div className="s-eye">FAQ</div>
            <h2 className="s-title">Common questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item, i) => (
              <div
                className={`faq-item reveal delay-${i + 1}${revealed ? ' in' : ''}${openIdx === i ? ' open' : ''}`}
                key={i}
              >
                <div className="faq-q" onClick={() => toggle(i)}>
                  {item.q}
                  <div className="faq-icon">
                    <svg viewBox="0 0 12 12" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round">
                      <line x1="6" y1="1" x2="6" y2="11" />
                      <line x1="1" y1="6" x2="11" y2="6" />
                    </svg>
                  </div>
                </div>
                <div className="faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
