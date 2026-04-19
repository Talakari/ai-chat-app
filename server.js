import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const userText = req.body.message;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: userText,
          },
        ],
      },
      {
        headers: {
          headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
  "HTTP-Referer": "https://your-app.vercel.app",
  "X-Title": "My AI App"
}
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    res.json({ reply: "Error occurred" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});