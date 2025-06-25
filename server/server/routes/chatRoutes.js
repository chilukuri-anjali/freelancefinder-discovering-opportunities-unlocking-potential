const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// 🔹 Send a message
router.post('/send', async (req, res) => {
  const { project, sender, message } = req.body;

  try {
    const newChat = new Chat({
      project,
      sender,
      message
    });

    await newChat.save();
    res.status(201).json({ message: 'Message sent', chat: newChat });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// 🔹 Get all messages for a project
router.get('/:projectId', async (req, res) => {
  try {
    const chats = await Chat.find({ project: req.params.projectId })
      .populate('sender', 'name email')
      .sort({ sentAt: 1 }); // sorted oldest to newest

    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
