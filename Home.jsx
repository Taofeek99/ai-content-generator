import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container">
      <div className="nav">
        <div className="logo">AI Content Generator</div>
        <div>
          <Link to="/" className="link">Home</Link>
          <Link to="/generate" style={{ marginLeft: 12 }} className="link">Generate</Link>
        </div>
      </div>

      <div className="card">
        <h1>Create High-Quality Content Instantly</h1>
        <p className="hint">Generate blog posts, ad copy, captions, and more — powered by OpenAI.</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
          <Link to="/generate"><button className="btn">Start Generating</button></Link>
          <a className="btn" href="https://platform.openai.com" target="_blank" rel="noreferrer"
             style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--muted)' }}>
            Get OpenAI Key
          </a>
        </div>
      </div>

      <div className="card">
        <h3>How It Works</h3>
        <ol className="hint">
          <li>Get your OpenAI API key.</li>
          <li>Set it as <b>OPENAI_API_KEY</b> in Vercel settings.</li>
          <li>Deploy and start generating content.</li>
        </ol>
      </div>

      <div className="footer">Made with ❤️ for creators</div>
    </div>
  )
}