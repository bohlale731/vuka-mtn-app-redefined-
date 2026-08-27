'use client'

import { useMemo, useState } from 'react'

type Member = { name: string; role: string; status: 'paid' | 'pending' | 'late'; initials: string }

const initialMembers: Member[] = [
  { name: 'You', role: 'Your contribution', status: 'paid', initials: 'YO' },
  { name: 'Thandi M.', role: 'Circle admin', status: 'paid', initials: 'TM' },
  { name: 'Kabelo S.', role: 'Member', status: 'pending', initials: 'KS' },
  { name: 'Nomsa D.', role: 'Member', status: 'late', initials: 'ND' },
]

const scoreRules = [
  ['On-time contributions', '+5', 'You paid this cycle'],
  ['Consistency streak', '+7', '3 cycles completed'],
  ['Pending contributions', '−0', 'No missed payments'],
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('Circle home')
  const [members, setMembers] = useState(initialMembers)
  const [score, setScore] = useState(62)
  const [notice, setNotice] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  const paidCount = members.filter((member) => member.status === 'paid').length
  const eligible = score >= 75
  const progress = Math.min(score, 75) / 75 * 100

  const nextContribution = useMemo(() => {
    if (paidCount === members.length) return 'Everyone is paid for this cycle'
    return `${members.length - paidCount} members still need to contribute`
  }, [members.length, paidCount])

  function contribute() {
    setMembers((current) => current.map((member) => member.name === 'You' ? { ...member, status: 'paid' } : member))
    setScore((current) => Math.min(80, current + 5))
    setNotice('Contribution request sent. Your Trust Score moved up by 5 points.')
  }

  function sendReminder() {
    setNotice('Reminder sent to Kabelo and Nomsa. We will let you know when they pay.')
  }

  function acceptAdvance() {
    setNotice('Advance approved. R1 500 has been scheduled for disbursement to your MoMo wallet.')
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="#top" aria-label="MoMo Vuka home"><span className="brand-mark">V</span><span>MoMo <b>Vuka</b></span></a>
        <nav aria-label="Main navigation">
          {['Circle home', 'Trust score', 'Smart split'].map((tab) => <button className={activeTab === tab ? 'nav-active' : ''} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}
        </nav>
        <button className="profile-button" aria-label="Open profile"><span>LM</span><strong>Lerato</strong><small>⌄</small></button>
      </header>

      <div className="content" id="top">
        <section className="welcome-row">
          <div><p className="eyebrow">Good morning, Lerato</p><h1>{activeTab === 'Circle home' ? 'Your Circle is moving forward.' : activeTab}</h1><p className="intro">Save together, build trust, and create a little more room to grow.</p></div>
          <button className="outline-button" onClick={() => setShowCreate(true)}>+ Create a Circle</button>
        </section>

        {notice && <div className="notice" role="status"><span>✓</span>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></div>}

        {activeTab === 'Circle home' && <>
          <section className="dashboard-grid">
            <article className="circle-card panel">
              <div className="panel-heading"><div><p className="eyebrow">Active Circle</p><h2>Ubuntu Builders</h2></div><span className="status-pill">On track</span></div>
              <div className="circle-meta"><span><b>R500</b> per month</span><span><b>{paidCount} of {members.length}</b> contributed</span><span><b>R2 000</b> total balance</span></div>
              <div className="cycle-row"><div><span className="muted-label">Next contribution</span><strong>Friday, 28 August</strong></div><span className="countdown">4 days left</span></div>
              <div className="member-list">{members.map((member) => <div className="member" key={member.name}><span className="avatar">{member.initials}</span><span className="member-copy"><b>{member.name}</b><small>{member.role}</small></span><span className={`member-status ${member.status}`}>{member.status === 'paid' ? 'Paid' : member.status === 'late' ? 'Late' : 'Pending'}</span></div>)}</div>
              <div className="circle-actions"><button className="primary-button" onClick={contribute}>Pay my contribution <span aria-hidden="true">→</span></button><button className="quiet-button" onClick={sendReminder}>Send a reminder</button></div>
            </article>

            <aside className="score-card panel" id="score"><div className="panel-heading"><div><p className="eyebrow">AI Trust Score</p><h2>Built through consistency.</h2></div><span className="score-change">+5 this cycle</span></div><div className="score-display"><strong>{score}</strong><span>/ 100</span><div className="score-ring"><div /></div></div><p className="score-message">{eligible ? 'You have unlocked a Business Advance.' : `You are ${75 - score} points away from unlocking a Business Advance.`}</p><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="progress-labels"><span>Starting point</span><b>Unlock at 75</b></div><div className="score-breakdown">{scoreRules.map(([label, points, detail]) => <div key={label}><span><b>{label}</b><small>{detail}</small></span><strong>{points}</strong></div>)}</div>{eligible && <button className="advance-button" onClick={acceptAdvance}>View your R1 500 advance <span>→</span></button>}</aside>
          </section>

          <section className="nudge panel"><span className="nudge-icon">i</span><div><b>Your Circle needs a little nudge</b><p>{nextContribution}. A friendly reminder can keep the cycle on track.</p></div><button className="quiet-button" onClick={sendReminder}>Send reminder</button></section>

          <section className="quick-grid"><button onClick={() => setActiveTab('Smart split')}><span className="quick-icon">÷</span><span><b>Smart Split</b><small>Share a bill with your Circle</small></span><strong>→</strong></button><button onClick={() => setNotice('Your rotation is set: Thandi, you, Kabelo, then Nomsa.')}><span className="quick-icon">↻</span><span><b>View payout rotation</b><small>Thandi is next in line</small></span><strong>→</strong></button><button onClick={() => setNotice('Remittance top-up is ready for your Circle members abroad.')}><span className="quick-icon">↗</span><span><b>Family top-up</b><small>Contribute from anywhere</small></span><strong>→</strong></button></section>
        </>}

        {activeTab === 'Trust score' && <section className="center-panel panel"><p className="eyebrow">Your progress</p><h2>Trust grows every time you show up.</h2><p>MoMo Vuka uses your real contribution history to make funding more accessible.</p><div className="big-score"><strong>{score}</strong><span>Trust Score</span></div><button className="primary-button" onClick={() => setActiveTab('Circle home')}>Back to Circle home <span>→</span></button></section>}
        {activeTab === 'Smart split' && <section className="center-panel panel"><p className="eyebrow">Coming up next</p><h2>Split a bill without the back-and-forth.</h2><p>Enter an amount and MoMo Vuka will send each Circle member a request-to-pay.</p><button className="primary-button" onClick={() => setNotice('Smart Split is ready for your next shared expense.')} >Start a Smart Split <span>→</span></button></section>}
      </div>

      <footer className="app-footer"><span>MoMo <b>Vuka</b></span><span>Save together. Build trust. Get funded.</span><span>Need help? <a href="#help">Contact support</a></span></footer>

      {showCreate && <div className="modal-backdrop" role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="create-title"><button className="modal-close" aria-label="Close" onClick={() => setShowCreate(false)}>×</button><p className="eyebrow">New Circle</p><h2 id="create-title">Start building together.</h2><p>Set up a shared goal and invite people you trust.</p><label htmlFor="circle-name">Circle name</label><input id="circle-name" placeholder="e.g. Ubuntu Builders" /><label htmlFor="circle-amount">Monthly contribution</label><input id="circle-amount" placeholder="R500" /><button className="primary-button" onClick={() => { setShowCreate(false); setNotice('Your Circle draft is ready. Invite your first members to get started.') }}>Create Circle <span>→</span></button></section></div>}
    </main>
  )
}
