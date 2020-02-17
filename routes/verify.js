const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    async verify(req, res, next) {
        try {
            const token = req.headers.authorization;
            const verify = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET);
            req.user = verify;
            next();
        } catch (fail) {
            res.status(403).json({ error: "Unauthorized" });
        }
    }
};