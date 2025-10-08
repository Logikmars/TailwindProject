const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, tokenData) => {
        if (err) {
            return res.status(401).json({ message: 'Old or Invalid token' });
        }
        req.tgId = tokenData.tgId;

        next();
    });
};

module.exports = authMiddleware;