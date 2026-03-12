export default function WhatYouDo() {
  return (
    <div className="white-bg" id="what">
      <div className="container">
        <div className="section">
          <div className="s-head reveal">
            <div className="s-eye">The program</div>
            <h2 className="s-title">Pretty simple, actually</h2>
            <p className="s-desc">Film it, post it, get paid. We handle the rest.</p>
          </div>
          <div className="icon-cards">
            <div className="icon-card reveal delay-1">
              <div className="ic" style={{ background: '#F0EBFF' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
              </div>
              <h3>Film your workflow</h3>
              <p>Pick something you already do with Playground and record yourself doing it. No script, no production. Just you and your screen.</p>
            </div>
            <div className="icon-card reveal delay-2">
              <div className="ic" style={{ background: '#FFF0E8' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
              <h3>Post on TikTok or Instagram</h3>
              <p>Aim for 5 to 7 videos a week. We give you ideas and watch everything you post so you're never guessing.</p>
            </div>
            <div className="icon-card reveal delay-3">
              <div className="ic" style={{ background: '#EBFAF2' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
              </div>
              <h3>Get paid every week</h3>
              <p>$20 per video, no minimums. If a video pops off you get bonus money on top.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
