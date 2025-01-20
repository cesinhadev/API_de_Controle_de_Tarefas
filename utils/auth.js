
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const createPasswordHash = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
};

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};

const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};

module.exports = {
    createPasswordHash,
    generateToken,
    validateToken
};