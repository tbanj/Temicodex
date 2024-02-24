import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";

dotenv.config();
const app = express();

/* 
    REST API,
    The difference between GET and POST is there is limited data
    that we can get from the request method when we make use of GET but
    we can get much more data from POST request method because it has body field

*/

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from Temicodex",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = { role: "user", content: req.body.prompt };

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [prompt],
      temperature: 0.8,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("server error", error);
    res.status(500).send({
      message: "Server error",
      error,
    });
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port http://localhost:5000");
});
