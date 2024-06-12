require('dotenv').config()
const config = process.env;
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
})

db.connect(e => {
    return e ? console.error('Database connection failed: ', e) : console.log('Database successfully connected.');
})

module.exports = db;