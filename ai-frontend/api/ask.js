export default async function handler(req, res) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "HTTP-Referer": "https://your-app.vercel.app",
        "X-Title": "My AI App"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: req.body.message }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}