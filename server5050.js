console.log("🚀 Starting TitanTrader bot...");
// server5050.js
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const app = express();
const PORT = 5055; // ✅ Updated port

// Telegram details
const TELEGRAM_BOT_TOKEN = "7708764950:AAFXKptt_tKHSjay8oHsALAWkp1s64faAsg";
const CHAT_ID = "1136055934";

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

async function sendTelegramMessage(message) {
  try {
    await bot.sendMessage(CHAT_ID, message);
    console.log(`✅ Telegram message sent: ${message}`);
  } catch (error) {
    console.error("❌ Telegram Error:", error.message);
  }
}

app.get("/", (req, res) => {
  res.send("🚀 TitanTrader is running on port 5050!");
});

app.get("/send", async (req, res) => {
  const { msg } = req.query;
  if (!msg) return res.status(400).send('❌ Missing "msg" query param');

  await sendTelegramMessage(msg);
  res.send("✅ Message sent to Telegram");
});

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

app.listen(PORT, () => {
  console.log(`🤖 TitanTrader is running on http://localhost:${PORT}`);
});
