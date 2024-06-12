require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db')

const config = process.env;

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    try {
        db.query(`SELECT * FROM users WHERE email='${email}'`, (err, rows) => {
            if (err) return console.error("Error retrieving email: ", err);
            if (rows.length == 0) return res.status(200).send({ error: 'Invalid credentials' });
            const verified = bcrypt.compareSync(password, rows[0].password);
            if (!verified) return res.status(200).send({ error: 'Invalid credentials' });

            const user = rows[0];
            const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: '1h' })
            res.status(201).send({ token, user })
        })
    } catch (error) {
        console.error("Error logging user: ", error)
    }
})

router.post('/register', (req, res) => {
    let { username, email, password } = req.body;
    try {
        db.query(`SELECT * FROM users WHERE email='${email}'`, (err, rows, fields) => {
            if (rows.length == 0) {
                password = bcrypt.hashSync(password, 10);
                db.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`, (err, rows, fields) => {
                    if (err) return res.status(500).send({ message: 'Error creating user: ' + err });
                    if (rows.affectedRows > 0) return res.status(201).send({ message: 'Account successfully created' });
                })
            } else return res.status(404).send({ message: 'Account already exists' });
        })
    } catch (error) {
        console.error("Error registering: ", error);
    }
})

module.exports = router;