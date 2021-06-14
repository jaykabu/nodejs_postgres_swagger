const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.sign(token, 'secret');
        req.userData = decoded

        next();
    } catch (err) {
        res.status(403).json({
            message: 'Auth failed'
        })
    }
}