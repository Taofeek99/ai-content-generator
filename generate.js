export default async function handler(req, res) {
  const { prompt } = req.body;
  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert content writer.' },
          { role: 'user', content: 'Write a creative post about: ' + prompt }
        ]
      })
    });
    const data = await r.json();
    res.status(200).json({ text: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
