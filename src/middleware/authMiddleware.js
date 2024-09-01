const { verifyToken } = require('../utils/auth');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    try {
      verifyToken(token);
      next();
    } catch (error) {
      res.status(403).json({ error: 'Prohibido' });
    }
  } else {
    res.status(401).json({ error: 'No se proporciona ningún token' });
  }
};

module.exports = authenticate;