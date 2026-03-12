import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const [reelCollapsed, setReelCollapsed] = useState(false)
  const [reelPlaying, setReelPlaying] = useState(false)
  const reelVideoRef = useRef(null)
  const reelOverlayRef = useRef(null)
  const heroContainerRef = useRef(null)
  const spotlightRef = useRef(null)

  // ── Reel toggle ──
  function handleReelToggle() {
    setReelCollapsed((prev) => {
      const next = !prev
      // If collapsing while playing, pause
      if (next && reelVideoRef.current && !reelVideoRef.current.paused) {
        reelVideoRef.current.pause()
        setReelPlaying(false)
      }
      return next
    })
  }

  // ── Reel play/pause ──
  function handleReelClick() {
    const v = reelVideoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setReelPlaying(true)
    } else {
      v.pause()
      setReelPlaying(false)
    }
  }

  // ── Reel video thumbnail ──
  useEffect(() => {
    const v = reelVideoRef.current
    if (!v) return
    function onMeta() {
      v.currentTime = 0.001
    }
    v.addEventListener('loadedmetadata', onMeta)
    function onPause() { setReelPlaying(false) }
    function onPlay() { setReelPlaying(true) }
    v.addEventListener('pause', onPause)
    v.addEventListener('play', onPlay)
    return () => {
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('play', onPlay)
    }
  }, [])

  // ── Hero Spotlight ──
  useEffect(() => {
    const hero = heroContainerRef.current
    const spot = spotlightRef.current
    if (!hero || !spot) return

    function onMove(e) {
      const r = hero.getBoundingClientRect()
      const x = e.clientX - r.left,
        y = e.clientY - r.top
      spot.style.background = `radial-gradient(circle 560px at ${x}px ${y}px, rgba(255,255,255,0.055) 0%, transparent 70%)`
      spot.style.opacity = '1'
    }
    function onLeave() {
      spot.style.opacity = '0'
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="hero-outer">
      <div className="hero-container" ref={heroContainerRef}>
        <video className="hero-video" autoPlay muted loop playsInline preload="auto" src="/hero-bg.mp4"></video>
        <div className="hero-spotlight" id="heroSpotlight" ref={spotlightRef}></div>

        {/* Reel panel */}
        <div className="hero-reel-outer">
          <div className={`hero-reel-inner${reelCollapsed ? ' collapsed' : ''}`} id="heroReelInner">
            <button className="reel-tab" id="reelToggle" aria-label="Toggle creator reel" onClick={handleReelToggle}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 2 9 6 5 10" /></svg>
            </button>
            <div className="reel-card">
              <div className="reel-label">
                <span className="reel-label-dot"></span>
                Creator reel
              </div>
              <div className="reel-video-wrap" id="reelVideoWrap" onClick={handleReelClick}>
                <video ref={reelVideoRef} id="reelVideo" src="/reel1.mp4" playsInline loop preload="metadata"></video>
                <div className={`reel-play-overlay${reelPlaying ? ' hidden' : ''}`} id="reelOverlay" ref={reelOverlayRef}>
                  <div className="reel-play-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.95)" stroke="none"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-vignette-top"></div>
        <div className="hero-vignette-bottom"></div>
        <div className="hero-content">
          <div className="hero-pill">
            <span className="hero-pill-dot"></span>
            Now accepting creators for our next cohort
          </div>
          <h1>
            <span style={{ color: '#fff', WebkitTextFillColor: '#fff' }}>Make videos about how you use Playground. </span>
            <span className="hero-shimmer">Get paid.</span>
          </h1>
          <p className="hero-sub">Film yourself using Playground for your work. Post it on TikTok or Instagram. Get paid $20 per video, with extra money when a video blows up.</p>
          <div className="hero-actions">
            <a href="https://tally.so/r/eqBJ9l" target="_blank" rel="noopener" className="h-btn-primary">Apply to the program</a>
            <a href="#niches" className="h-btn-ghost">See example niches</a>
          </div>
          <div className="hero-badges">
            <span className="hero-badge">2-minute application</span>
            <span className="hero-badge">Limited spots per cohort</span>
            <span className="hero-badge">No experience required</span>
          </div>
          {/* Scroll nudge */}
          <div className="scroll-hint">
            <span>Scroll</span>
            <div className="scroll-chevron">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round"><polyline points="2 4 6 8 10 4" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
