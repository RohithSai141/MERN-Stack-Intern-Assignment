const express = require('express');
console.error(err);
res.status(500).send('Server error');
}
});


// Admin: edit student
router.put('/:id', auth, requireRole(['admin']), async (req, res) => {
try {
const update = { ...req.body };
if (update.password) {
const bcrypt = require('bcryptjs');
const salt = await bcrypt.genSalt(10);
update.password = await bcrypt.hash(update.password, salt);
}
await User.findByIdAndUpdate(req.params.id, update);
res.json({ message: 'Student updated' });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


// Admin: delete student
router.delete('/:id', auth, requireRole(['admin']), async (req, res) => {
try {
await User.findByIdAndDelete(req.params.id);
res.json({ message: 'Student deleted' });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


// Student: update own profile
router.put('/me/profile', auth, requireRole(['student','admin']), async (req, res) => {
try {
const id = req.user._id;
const update = { ...req.body };
if (update.password) {
const bcrypt = require('bcryptjs');
const salt = await bcrypt.genSalt(10);
update.password = await bcrypt.hash(update.password, salt);
}
const user = await User.findByIdAndUpdate(id, update, { new: true }).select('-password');
res.json(user);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


module.exports = router;
