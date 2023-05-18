const ChatMessage = require('../models/chat');

// GET - Get chat history between a parent and a teacher
exports.getChatHistory = async (req, res) => {
try {
const { parentId, teacherId } = req.params;
const messages = await ChatMessage.find({
$or: [
{ sender: parentId, receiver: teacherId },
{ sender: teacherId, receiver: parentId },
]});

res.json(messages);
} catch (error) {
console.error(error);
res.status(500).send('Server error');
}
};

// POST - Create a new chat message
exports.createChatMessage = async (req, res) => {
try {
const { sender, receiver, message, subject } = req.body;
const timestamp = new Date();
const chatMessage = new ChatMessage({
sender,
receiver,
message,
subject,
timestamp,
});
await chatMessage.save();
res.json(chatMessage);
} catch (error) {
console.error(error);
res.status(500).send('Server error');
}
};