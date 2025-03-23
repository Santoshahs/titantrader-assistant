// server.js
const express = require("express");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5050; // Changed from 5353 to 5050

// ✅ Replace with your actual Telegram Bot Token and Chat ID
const TELEGRAM_BOT_TOKEN = "7708764950:AAFXKptt_tKHSjay8oHsALAWkp1s64faAsg";
const CHAT_ID = "1136055934"; // Your personal Telegram ID

// Initialize the Telegram bot (no polling needed for this use case)
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

// ✅ Helper function to send Telegram message
async function sendTelegramMessage(message) {
  try {
    await bot.sendMessage(CHAT_ID, message);
    console.log(`✅ Telegram message sent: ${message}`);
  } catch (error) {
    console.error("❌ Failed to send Telegram message:", error.message);
  }
}

// ✅ Test route for homepage
app.get("/", (req, res) => {
  res.send("🚀 TitanTrader server is up and running on port 5050!");
});

// ✅ Route to manually send message via query param
app.get("/send", async (req, res) => {
  const { msg } = req.query;
  if (!msg) return res.status(400).send('❌ Missing "msg" query param');

  await sendTelegramMessage(msg);
  res.send("✅ Message sent to Telegram");
});

// ✅ Route for crypto alerts
app.get("/alert", async (req, res) => {
  const { coin, move, from, to } = req.query;
  if (!coin || !move || !from || !to) {
    return res
      .status(400)
      .send("❌ Missing query params: coin, move, from, to");
  }

  const message = `🚨 ${coin} BIG MOVE: ${move.toUpperCase()} ${from} → ${to}`;
  await sendTelegramMessage(message);
  res.send("✅ Alert sent to Telegram");
});

// ✅ Start the Express server
app.listen(PORT, () => {
  console.log(
    `🤖 TitanTrader Assistant (Free Brain) is running on http://localhost:${PORT}`
  );
});
