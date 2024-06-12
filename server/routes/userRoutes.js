const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
    db.query(`SELECT * FROM users`, (err, rows) => {
        if (err) return console.error("Error retrieving users: ", err);
        res.status(201).send(rows);
    })
})

module.exports = router;