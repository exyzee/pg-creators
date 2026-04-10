import { useEffect, useRef } from 'react'

const TALLY_URL = 'https://tally.so/r/eqBJ9l'

const SECTIONS = [
  { id: 'what', label: 'The program', desc: "What you'll do and how it works" },
  { id: 'earn', label: 'Compensation', desc: 'Pay structure and view bonuses' },
  { id: 'features', label: 'What to film', desc: 'Features and content ideas' },
  { id: 'faq', label: 'FAQ', desc: 'Common questions answered' },
]

export default function ReadinessGate({ isOpen, onClose, viewed }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const count = SECTIONS.filter(s => viewed[s.id]).length
  const allViewed = count === SECTIONS.length

  function scrollTo(id) {
    onClose()
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 350)
  }

  function goApply() {
    onClose()
    window.open(TALLY_URL, '_blank', 'noopener')
  }

  return (
    <div className="gate-overlay" ref={overlayRef} onClick={e => e.target === overlayRef.current && onClose()}>
      <div className="gate-modal">
        <button className="gate-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
          </svg>
        </button>

        <div className={`gate-badge${allViewed ? ' ready' : ''}`}>
          {allViewed ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="13" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </div>

        <h3 className="gate-title">{allViewed ? "You're all set" : 'Quick check before you apply'}</h3>
        <p className="gate-sub">
          {allViewed
            ? "You've reviewed the key details. Ready when you are."
            : 'Applicants who review these sections write stronger applications and hear back faster.'}
        </p>

        <div className="gate-bar-wrap">
          <div className="gate-bar">
            <div className="gate-bar-fill" style={{ width: `${(count / SECTIONS.length) * 100}%` }} />
          </div>
          <span className="gate-bar-label">{count} of {SECTIONS.length}</span>
        </div>

        <div className="gate-list">
          {SECTIONS.map(s => (
            <div className={`gate-row${viewed[s.id] ? ' done' : ''}`} key={s.id}>
              <div className="gate-dot">
                {viewed[s.id] ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="var(--green)" />
                    <polyline points="5.5 10 8.5 13 14.5 7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9.5" stroke="var(--border-2)" />
                  </svg>
                )}
              </div>
              <div className="gate-row-info">
                <span className="gate-row-label">{s.label}</span>
                <span className="gate-row-desc">{s.desc}</span>
              </div>
              {!viewed[s.id] && (
                <button className="gate-go" onClick={() => scrollTo(s.id)}>
                  Read
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="2 3 5 7 8 3" /></svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <button className="gate-cta" onClick={goApply}>
          {allViewed ? 'Apply to the program' : 'Apply anyway'}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="7" x2="12" y2="7" />
            <polyline points="8 3 12 7 8 11" />
          </svg>
        </button>

        {!allViewed && (
          <p className="gate-note">You won't be blocked — but reading these first really helps.</p>
        )}
      </div>
    </div>
  )
}
