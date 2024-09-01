const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (username, password) => {
  const { JWT_SECRET } = process.env;
  if (username === process.env.USER_USERNAME && password === process.env.USER_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
  throw new Error('Credenciales inválidas');
};

const verifyToken = (token) => {
  const { JWT_SECRET } = process.env;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

module.exports = { generateToken, verifyToken };
