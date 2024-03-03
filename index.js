const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
let PORT = process.env.PORT || 9000;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post("/gemini", async (req, res) => {
  const { message, history } = req.body;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: history,
  });

  const msg = message;
  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  res.send(text);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
