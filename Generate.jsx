import React, { useState } from 'react'

export default function Generate() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  async function handleGenerate() {
    if (!prompt.trim()) return alert('Please enter a topic or keyword.')
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      const data = await res.json()
      if (data.error) setResult('Error: ' + data.error)
      else setResult(data.text || 'No response')
    } catch (e) {
      setResult('Error: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="nav">
        <div className="logo">AI Content Generator</div>
        <div>
          <a href="/" className="link">Home</a>
          <a href="/generate" style={{ marginLeft: 12 }} className="link">Generate</a>
        </div>
      </div>

      <div className="card">
        <h2>Generate Content</h2>
        <p className="hint">Enter a topic or idea below.</p>
        <textarea className="input" rows="4" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="e.g. Benefits of daily journaling" />
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button className="btn" onClick={handleGenerate} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>
          <button className="btn" onClick={() => { setPrompt(''); setResult(''); }}
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--muted)' }}>Clear</button>
        </div>
        <div className="result">{result || <span className="hint">Results will appear here.</span>}</div>
      </div>
    </div>
  )
}