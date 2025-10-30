import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return alert('Enter a topic');
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setResult(data.text || 'No result');
    } catch (e) {
      setResult('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>AI Content Generator Hub</h2>
      <textarea
        placeholder='Enter topic...'
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ width: '100%', height: 80 }}
      />
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      <pre style={{ marginTop: 20 }}>{result}</pre>
    </div>
  );
}
