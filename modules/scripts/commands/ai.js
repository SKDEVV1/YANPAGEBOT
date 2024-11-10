const fetch = require('node-fetch'); // Ensure node-fetch is installed

module.exports.config = {
  name: "ai",
  author: "khaile",
  version: "1.0",
  description: "Logs every message received.",
  selfListen: false,
};

module.exports.run = function ({ event }) {
  if (event.type === 'message' && event.message.text) {
    console.log(`Received message: ${event.message.text}`);
    handleMessage(event);
  }
};

function handleMessage(event) {
  const senderID = event.sender.id;
  const message = event.message.text.toLowerCase();
  
  if (message.includes('how are you')) {
    getHercaiReply("Hi, how are you?", senderID);
  } else if (message.includes('draw anime')) {
    getImageFromHercai("anime girl", senderID);
  } else {
    getHercaiReply(message, senderID);
  }
}

function getHercaiReply(question, senderID) {
  fetch(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(question)}`)
    .then(res => res.json())
    .then(data => sendMessage(data.reply || "Sorry, no reply found.", senderID))
    .catch(() => sendMessage("Error with Hercai API.", senderID));
}

function getImageFromHercai(prompt, senderID) {
  fetch(`https://hercai.onrender.com/v3/text2image?prompt=${encodeURIComponent(prompt)}`)
    .then(res => res.json())
    .then(data => sendMessage(data.url || "Error generating image.", senderID))
    .catch(() => sendMessage("Error generating image.", senderID));
}

function sendMessage(message, senderID) {
  // Replace with your bot platform's API call
  api.sendMessage(message, senderID).catch(console.error);
}
