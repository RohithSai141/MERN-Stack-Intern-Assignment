const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Register
router.post('/register', async (req, res) => {
const { name, email, password, role, department } = req.body;
try {
let user = await User.findOne({ email });
if (user) return res.status(400).json({ message: 'User already exists' });
user = new User({ name, email, password, role: role || 'student', department });
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password, salt);
await user.save();
const payload = { id: user._id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token });
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});


// Login
router.post('/login', async (req, res) => {
const { email, password } = req.body;
try {
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
const payload = { id: user._id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token });
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});


// Get current user
const { auth } = require('../middleware/authMiddleware');
router.get('/me', auth, async (req, res) => {
res.json(req.user);
});


module.exports = router;
