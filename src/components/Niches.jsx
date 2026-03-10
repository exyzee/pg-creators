const niches = [
  { emoji: '🛍', name: 'E-commerce', ex: '"Product photos for my whole Etsy shop in one sitting"', delay: 1 },
  { emoji: '📱', name: 'Social Media', ex: '"How I batch a week of content in 30 minutes"', delay: 2 },
  { emoji: '🎨', name: 'Graphic Design', ex: '"How I make logos for clients now"', delay: 3 },
  { emoji: '📰', name: 'Marketing', ex: '"Making ad creatives that actually convert"', delay: 4 },
  { emoji: '👕', name: 'Print on Demand', ex: '"Designed a whole t-shirt line in one afternoon"', delay: 1 },
  { emoji: '🎮', name: 'Gaming / Art', ex: '"Making concept art for my indie game"', delay: 2 },
  { emoji: '📚', name: 'Education', ex: '"Custom illustrations for my lesson plans"', delay: 3 },
  { emoji: '✨', name: 'Something else', ex: '"Got a niche we haven\'t listed? Apply anyway."', delay: 4 },
]

export default function Niches() {
  return (
    <div className="gray-bg" id="niches">
      <div className="container">
        <div className="section">
          <div className="s-head reveal">
            <div className="s-eye">Find your angle</div>
            <h2 className="s-title">There's a version of this that fits what you do</h2>
            <p className="s-desc">Some of the niches that work well. This isn't an exhaustive list.</p>
          </div>
          <div className="niche-grid">
            {niches.map((n, i) => (
              <div className={`niche-card reveal delay-${n.delay}`} key={i}>
                <span className="niche-emoji">{n.emoji}</span>
                <div className="niche-name">{n.name}</div>
                <div className="niche-ex">{n.ex}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
