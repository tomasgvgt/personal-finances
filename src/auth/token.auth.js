const jwt = require('jsonwebtoken');

function createToken(user){
  const payload = {
    id: user.id,
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
}

function verifyToken(token){
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded;
}

module.exports = {
  createToken,
  verifyToken
}
