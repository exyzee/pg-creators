import { useEffect, useRef, useState } from 'react'

export default function Features() {
  const trackRef = useRef(null)
  const [mobileIdx, setMobileIdx] = useState(0)
  const activeVidRef = useRef(null)

  // ── First-frame thumbnails ──
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.querySelectorAll('video').forEach((v) => {
      v.addEventListener('loadedmetadata', () => {
        v.currentTime = 0.001
      })
    })
  }, [])

  // ── Play / pause — only one at a time ──
  function handleExClick(e) {
    const wrap = e.currentTarget
    const v = wrap.querySelector('video')
    const ol = wrap.querySelector('.ex-overlay')
    if (activeVidRef.current && activeVidRef.current !== v) {
      activeVidRef.current.pause()
      activeVidRef.current.currentTime = 0.001
      activeVidRef.current
        .closest('[data-ex]')
        .querySelector('.ex-overlay')
        .classList.remove('hidden')
      activeVidRef.current = null
    }
    if (v.paused) {
      v.play()
      ol.classList.add('hidden')
      activeVidRef.current = v
    } else {
      v.pause()
      v.currentTime = 0.001
      ol.classList.remove('hidden')
      activeVidRef.current = null
    }
  }

  // ── Mobile arrow navigation ──
  function isMobile() {
    return window.innerWidth <= 900
  }
  function cardW() {
    const track = trackRef.current
    const c = track?.querySelector('.ex-card')
    return c ? c.offsetWidth + 16 : 0
  }
  function cardsCount() {
    return trackRef.current?.querySelectorAll('.ex-card').length || 0
  }
  function maxIdx() {
    const track = trackRef.current
    if (!track) return 0
    return cardsCount() - Math.floor((track.parentElement.offsetWidth + 16) / cardW())
  }

  function goTo(i) {
    if (!isMobile()) return
    const max = maxIdx()
    const newIdx = Math.max(0, Math.min(max, i))
    setMobileIdx(newIdx)
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newIdx * cardW()}px)`
    }
  }

  useEffect(() => {
    function onResize() {
      if (!isMobile()) {
        if (trackRef.current) trackRef.current.style.transform = ''
        setMobileIdx(0)
      } else {
        goTo(mobileIdx)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [mobileIdx])

  const exVideos = ['ex1.mp4', 'ex2.mp4', 'ex3.mp4', 'ex4.mp4']

  return (
    <div className="gray-bg" id="features">
      <div className="container">
        <div className="section">
          <div className="s-head reveal">
            <div className="s-eye">What to film</div>
            <h2 className="s-title">Pick a feature. Film yourself using it.</h2>
            <p className="s-desc">That's the whole idea. Here's what works well on short-form video.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card reveal delay-1">
              <div className="f-icon" style={{ background: '#F0EBFF' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><circle cx="11" cy="11" r="2" /></svg>
              </div>
              <div>
                <h4>Text to image</h4>
                <p>Type what you want, get an image. Show your process from the first prompt to the final result.</p>
                <span className="vid-idea">💡 "I generated 10 logo options in 2 minutes"</span>
              </div>
            </div>
            <div className="feature-card reveal delay-2">
              <div className="f-icon" style={{ background: '#FFF0E8' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              </div>
              <div>
                <h4>Image editing</h4>
                <p>Swap backgrounds, fix stuff in photos, clean up product shots. The before/after format does really well on TikTok.</p>
                <span className="vid-idea">💡 "Fixing my product photos in Playground"</span>
              </div>
            </div>
            <div className="feature-card reveal delay-3">
              <div className="f-icon" style={{ background: '#EBF4FF' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5" /></svg>
              </div>
              <div>
                <h4>Templates and styles</h4>
                <p>Hundreds of starting points. Show how fast you get from a blank template to something finished.</p>
                <span className="vid-idea">💡 "Made a full social media kit in 15 min"</span>
              </div>
            </div>
            <div className="feature-card reveal delay-4">
              <div className="f-icon" style={{ background: '#FFFBE8' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
              </div>
              <div>
                <h4>Background removal</h4>
                <p>One click and the background is gone. Great for Etsy sellers, anyone doing product shots, or portrait work.</p>
                <span className="vid-idea">💡 "Prepping Etsy listings in seconds"</span>
              </div>
            </div>
            <div className="feature-card reveal delay-1">
              <div className="f-icon" style={{ background: '#EBFAF2' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" strokeLinecap="round" /><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
              <div>
                <h4>Sticker and merch design</h4>
                <p>Type what you want on a shirt or sticker sheet and Playground builds it out. Good content for anyone with an online store.</p>
                <span className="vid-idea">💡 "Designed a whole merch line in an hour"</span>
              </div>
            </div>
            <div className="feature-card reveal delay-2">
              <div className="f-icon" style={{ background: '#FFF0F6' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB2777" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div>
                <h4>Upscale and enhance</h4>
                <p>Low-res photo in, print-quality out. Easy comparison video that people actually want to watch.</p>
                <span className="vid-idea">💡 "Turning old blurry photos into high-res"</span>
              </div>
            </div>
          </div>

          {/* EXAMPLE VIDEOS */}
          <div className="ex-section reveal">
            <div className="ex-section-eye">Real examples</div>
            <div className="ex-section-title">Videos from our creators</div>
            <div className="ex-grid-outer">
              <div className="ex-video-grid" id="exTrack" ref={trackRef}>
                {exVideos.map((src, i) => (
                  <div className="ex-card" key={i}>
                    <div className="ex-video-wrap" data-ex="" onClick={handleExClick}>
                      <video src={`/${src}`} playsInline preload="metadata" loop></video>
                      <div className="ex-overlay">
                        <div className="ex-play-btn">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--text)" stroke="none"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* nav arrows — shown only on small screens via CSS */}
              <div className="ex-nav-row">
                <button
                  className="ex-nav-btn"
                  id="exPrev"
                  disabled={mobileIdx === 0}
                  aria-label="Previous"
                  onClick={() => goTo(mobileIdx - 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="10 3 5 8 10 13" /></svg>
                </button>
                <button
                  className="ex-nav-btn"
                  id="exNext"
                  aria-label="Next"
                  onClick={() => goTo(mobileIdx + 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 3 11 8 6 13" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
