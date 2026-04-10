export default function FinalCTA({ onApplyClick }) {
  return (
    <div className="cta-outer" id="apply">
      <div className="cta-inner reveal-scale">
        <div className="cta-eyebrow">Ready to start?</div>
        <h2>Show the world how<br />you use Playground</h2>
        <p>Film your process. Post it. Get paid.</p>
        <a href="https://tally.so/r/eqBJ9l" target="_blank" rel="noopener" className="h-btn-primary" onClick={e => { e.preventDefault(); onApplyClick() }}>Apply to the program</a>
        <div className="cta-note">No experience required <span>&middot;</span> Rolling admissions <span>&middot;</span> 2 minutes</div>
      </div>
    </div>
  )
}
