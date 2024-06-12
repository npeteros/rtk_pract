require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('./db');

const config = process.env

const authJWT = (req, res, next) => {
    const token = req.header('AuthToken');
    if (!token) return res.status(200).send({ error: "Access denied" })
    try {
        const verified = jwt.verify(token, config.JWT_SECRET);
        const uID = req.params.uID;
        db.query(`SELECT * FROM users WHERE id=${uID}`, (err, rows) => {
            if (err) return console.error("Error retrieving user: ", err);
            req.user = rows[0];
            next();
        })
    } catch (error) {
        console.error("Error authenticating JWT: ", error);
    }
}

module.exports = authJWT