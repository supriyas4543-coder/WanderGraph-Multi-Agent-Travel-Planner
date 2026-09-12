// LLM Client for direct Gemini or OpenAI API integration (optional) with built-in agent fallback

export async function callLLM({ prompt, systemPrompt, settings }) {
  if (settings.provider === 'gemini' && settings.apiKeyGemini) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${settings.apiKeyGemini}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\nUser Request: ${prompt}` }] }]
        })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent agent fallback:', err);
    }
  } else if (settings.provider === 'openai' && settings.apiKeyOpenAI) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKeyOpenAI}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ]
        })
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content;
    } catch (err) {
      console.warn('OpenAI API call failed, using intelligent agent fallback:', err);
    }
  }
  return null;
}
