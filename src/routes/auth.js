const express = require('express');
const router = express.Router();
const { generateToken } = require('../utils/auth');

router.post('/token', (req, res) => {
  const { username, password } = req.body;
  try {
    const token = generateToken(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'No autorizado' });
  }
});

module.exports = router;
