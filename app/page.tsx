'use client'

import { useState } from 'react'

const actions = [
  { title: 'Buy airtime', text: 'Top up your phone in seconds.', icon: '＋', tone: 'yellow' },
  { title: 'Get data', text: 'Find a plan that fits your day.', icon: '◌', tone: 'blue' },
  { title: 'Explore bundles', text: 'More value for calls and data.', icon: '▣', tone: 'green' },
  { title: 'Check balance', text: 'See what you have left.', icon: '◒', tone: 'dark' },
]

export default function Home() {
  const [notice, setNotice] = useState('')
  const handleAction = (title: string) => setNotice(`${title} selected. We’ll guide you through it next.`)

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Vuka home"><span className="brand-mark">V</span><span>vuka</span></a>
        <nav aria-label="Main navigation"><a href="#services">Services</a><a href="#help">Help</a><a className="nav-link" href="#account">My account</a></nav>
        <button className="menu-button" aria-label="Open menu">Menu</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Your everyday mobile companion</p>
          <h1>Mobile made <em>simple.</em></h1>
          <p className="hero-text">Stay connected without the fuss. Buy airtime, find data and manage your mobile life from one friendly place.</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => handleAction('Get started')}>Get started <span aria-hidden="true">→</span></button><a className="text-link" href="#services">See what you can do <span aria-hidden="true">↓</span></a></div>
          {notice && <p className="notice" role="status">{notice}</p>}
        </div>
        <div className="status-card" aria-label="Your mobile snapshot">
          <div className="status-top"><span className="status-label">Your snapshot</span><span className="online-dot">● Active</span></div>
          <div className="balance"><span>Available balance</span><strong>R 120.00</strong></div>
          <div className="meter-row"><span>Data</span><span>2.4 GB left</span></div><div className="meter"><span /></div>
          <div className="meter-row"><span>Expires</span><span>In 12 days</span></div>
          <button className="card-button" onClick={() => handleAction('Balance details')}>View balance details <span aria-hidden="true">→</span></button>
        </div>
      </section>

      <section className="services" id="services"><div className="section-heading"><div><p className="eyebrow">Do more, easily</p><h2>What do you need today?</h2></div><p>Everything you need is right here. Pick an action to get started.</p></div>
        <div className="action-grid">{actions.map((action) => <button className={`action-card ${action.tone}`} key={action.title} onClick={() => handleAction(action.title)}><span className="action-icon" aria-hidden="true">{action.icon}</span><span className="action-content"><strong>{action.title}</strong><span>{action.text}</span></span><span className="arrow" aria-hidden="true">→</span></button>)}</div>
      </section>

      <section className="help-section" id="help"><div><p className="eyebrow">Need a hand?</p><h2>We’re here when you need us.</h2><p>Find quick answers, learn how to use Vuka, or talk to a real person.</p></div><div className="help-links"><a href="#faq"><span>Browse FAQs</span><span aria-hidden="true">→</span></a><a href="#contact"><span>Contact support</span><span aria-hidden="true">→</span></a></div></section>
      <footer><span className="brand"><span className="brand-mark">V</span><span>vuka</span></span><span>Simple connections. Better days.</span><span>© 2026 Vuka</span></footer>
    </main>
  )
}
