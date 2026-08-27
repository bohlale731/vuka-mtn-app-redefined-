'use client'

import { FormEvent, useState } from 'react'

const actions = [
  { title: 'Buy airtime', text: 'Top up your phone in seconds.', icon: '＋', tone: 'yellow', placeholder: 'Amount in rand' },
  { title: 'Get data', text: 'Find a plan that fits your day.', icon: '◌', tone: 'blue', placeholder: 'Choose a data plan' },
  { title: 'Explore bundles', text: 'More value for calls and data.', icon: '▣', tone: 'green', placeholder: 'Choose a bundle' },
  { title: 'Check balance', text: 'See what you have left.', icon: '◒', tone: 'dark', placeholder: '' },
]

export default function Home() {
  const [selectedAction, setSelectedAction] = useState<typeof actions[number] | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const openAction = (action: typeof actions[number]) => {
    setSubmitted(false)
    setSelectedAction(action)
    setMenuOpen(false)
  }

  const submitAction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Vuka home"><span className="brand-mark">V</span><span>vuka</span></a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation"><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#help" onClick={() => setMenuOpen(false)}>Help</a><a className="nav-link" href="#account" onClick={() => setMenuOpen(false)}>My account</a></nav>
        <button className="menu-button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Your everyday mobile companion</p>
          <h1>Mobile made <em>simple.</em></h1>
          <p className="hero-text">Stay connected without the fuss. Buy airtime, find data and manage your mobile life from one friendly place.</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => openAction(actions[0])}>Get started <span aria-hidden="true">→</span></button><a className="text-link" href="#services">See what you can do <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="status-card" aria-label="Your mobile snapshot">
          <div className="status-top"><span className="status-label">Your snapshot</span><span className="online-dot">● Active</span></div>
          <div className="balance"><span>Available balance</span><strong>R 120.00</strong></div>
          <div className="meter-row"><span>Data</span><span>2.4 GB left</span></div><div className="meter"><span /></div>
          <div className="meter-row"><span>Expires</span><span>In 12 days</span></div>
          <button className="card-button" onClick={() => openAction(actions[3])}>View balance details <span aria-hidden="true">→</span></button>
        </div>
      </section>

      <section className="services" id="services"><div className="section-heading"><div><p className="eyebrow">Do more, easily</p><h2>What do you need today?</h2></div><p>Everything you need is right here. Pick an action to get started.</p></div>
        <div className="action-grid">{actions.map((action) => <button className={`action-card ${action.tone}`} key={action.title} onClick={() => openAction(action)}><span className="action-icon" aria-hidden="true">{action.icon}</span><span className="action-content"><strong>{action.title}</strong><span>{action.text}</span></span><span className="arrow" aria-hidden="true">→</span></button>)}</div>
      </section>

      <section className="help-section" id="help"><div><p className="eyebrow">Need a hand?</p><h2>We&apos;re here when you need us.</h2><p>Find quick answers, learn how to use Vuka, or talk to a real person.</p></div><div className="help-links"><button onClick={() => openAction({ title: 'Browse FAQs', text: 'Find quick answers to common questions.', icon: '?', tone: 'blue', placeholder: 'What do you need help with?' })}><span>Browse FAQs</span><span aria-hidden="true">→</span></button><button onClick={() => openAction({ title: 'Contact support', text: 'Tell us how we can help.', icon: '✦', tone: 'green', placeholder: 'How can we help?' })}><span>Contact support</span><span aria-hidden="true">→</span></button></div></section>
      <footer><span className="brand"><span className="brand-mark">V</span><span>vuka</span></span><span>Simple connections. Better days.</span><span>© 2026 Vuka</span></footer>

      {selectedAction && <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedAction(null)}><section className="action-dialog" role="dialog" aria-modal="true" aria-labelledby="action-title"><button className="dialog-close" aria-label="Close" onClick={() => setSelectedAction(null)}>×</button>{submitted ? <div className="success-state"><span className="success-icon">✓</span><h2>All set.</h2><p>Your request for {selectedAction.title.toLowerCase()} has been received. We&apos;ll guide you through the next step.</p><button className="primary-button" onClick={() => setSelectedAction(null)}>Done <span aria-hidden="true">→</span></button></div> : <><p className="eyebrow">{selectedAction.title}</p><h2 id="action-title">Let&apos;s get you sorted.</h2><p>{selectedAction.text}</p>{selectedAction.placeholder ? <form onSubmit={submitAction}><label htmlFor="action-input">{selectedAction.placeholder}</label><input id="action-input" required placeholder="Type here" /><button className="primary-button" type="submit">Continue <span aria-hidden="true">→</span></button></form> : <button className="primary-button" onClick={() => setSubmitted(true)}>Show balance <span aria-hidden="true">→</span></button>}</>}</section></div>}
    </main>
  )
}
