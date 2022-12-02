const bcrypt = require('bcrypt');

async function hashPassword(password){
    const rounds = 10;
    const hashed = await bcrypt.hash(password, rounds);
    return hashed;
}

module.exports = hashPassword;