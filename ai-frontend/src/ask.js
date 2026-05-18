export async function sendMessage(message) {
  try {
    const response = await fetch(
      "https://ai-chat-app-1-h8x8.onrender.com/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    const data = await response.json();

    return data.reply || "No response";
  } catch (error) {
    console.log(error);
    return "Server Error";
  }
}