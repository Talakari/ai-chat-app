import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/ask", async (req, res) => {

  const { message } = req.body;

  try {

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content,
    });

  } catch (error) {

    console.log(error);

    res.json({
      reply: "Backend Error",
    });

  }

});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});