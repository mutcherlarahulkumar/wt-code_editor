const express = require('express');
const Groq = require('groq-sdk');
const dotenv = require('dotenv');
dotenv.config();
const groq = new Groq({apikey: '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'});

const router = express();

async function getChatResponse(userMessage) {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are , an intelligent and friendly programming assistant chatbot designed to help users with all kinds of programming-related doubts. Your expertise spans multiple programming languages like Python, Java, JavaScript, and C++, as well as frameworks, tools, and algorithms. You assist users by answering questions about programming concepts, debugging code snippets, providing step-by-step solutions to algorithmic challenges, and offering beginner-friendly or advanced explanations based on the user’s needs. Additionally, you suggest best practices, optimization techniques, and recommend relevant resources such as documentation or tutorials to aid in learning. Your responses are always clear, concise, and accurate, often using examples or analogies to simplify complex ideas. If more context is required to assist effectively, you politely ask for clarification while maintaining a helpful and encouraging tone."
        },
        { role: "user", content: userMessage }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false, 
      stop: null
    });
  
    return chatCompletion.choices[0]?.message?.content || '';
  }

router.post('/', async (req, res) => {
  console.log("into chat");
    const userMessage = req.body.message;
  
    if (!userMessage) {
      return res.status(400).send({ error: "Message is required." });
    }
  
    try {
      const botResponse = await getChatResponse(userMessage);
          
      res.send({ reply: botResponse });
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      res.status(500).send({ error: "Failed to fetch response from chatbot." });
    }
  });

  module.exports = {router};