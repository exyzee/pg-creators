export default function Perks() {
  return (
    <div className="gray-bg">
      <div className="container">
        <div className="section">
          <div className="s-head reveal">
            <div className="s-eye">Benefits</div>
            <h2 className="s-title">It's not just the money</h2>
          </div>
          <div className="perks-grid">
            <div className="perk-card reveal delay-1">
              <div className="perk-ic" style={{ background: '#EBFAF2' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              </div>
              <h4>$20 per video, guaranteed</h4>
              <p>You get paid no matter what. View bonuses are on top of that.</p>
            </div>
            <div className="perk-card reveal delay-2">
              <div className="perk-ic" style={{ background: '#F0EBFF' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </div>
              <h4>Free Pro account</h4>
              <p>Full Playground Pro while you're in the program, on us.</p>
            </div>
            <div className="perk-card reveal delay-3">
              <div className="perk-ic" style={{ background: '#FFF0E8' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <h4>Private Slack</h4>
              <p>A group with other creators and the Playground team. Not a newsletter, an actual conversation.</p>
            </div>
            <div className="perk-card reveal delay-1">
              <div className="perk-ic" style={{ background: '#FFFBE8' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
              </div>
              <h4>Inside a real startup</h4>
              <p>Work directly with the people building Playground. Not an internship, not busy work.</p>
            </div>
            <div className="perk-card reveal delay-2">
              <div className="perk-ic" style={{ background: '#FFF0F6' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DB2777" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </div>
              <h4>Build your audience</h4>
              <p>Your account, your followers. We help you grow it but you keep everything.</p>
            </div>
            <div className="perk-card reveal delay-3">
              <div className="perk-ic" style={{ background: '#EBF4FF' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <h4>Other creators</h4>
              <p>A small group doing the same thing. Share what's working, ask questions, compare notes.</p>
            </div>
          </div>
          <div className="team-banner reveal">
            <div className="team-av">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>
            <div>
              <h4>We're actually in the Slack</h4>
              <p>It's not a shared email or a bot. You'll be in a channel with the people who built the product. Ask questions, get feedback on your videos, and see what building a startup actually looks like up close.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
