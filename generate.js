export default async function handler(req, res) {
  try {
    const { prompt } = req.body || {}
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' })

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional content writer.' },
          { role: 'user', content: `Write a concise, engaging article about: ${prompt}` }
        ],
        max_tokens: 600
      })
    })

    const data = await r.json()
    const text = data?.choices?.[0]?.message?.content || 'No response'
    res.status(200).json({ text })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}