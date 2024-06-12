const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
    db.query(`SELECT * FROM posts ORDER BY createdOn DESC`, (err, rows) => {
        if (err) return console.error("Error retrieving posts: ", err);
        res.status(201).send(rows);
    })
})

router.post('/', (req, res) => {
    const { authorID, post } = req.body;
    try {
        db.query(`INSERT INTO posts (userID, post) VALUES (${authorID}, ?)`, [post], (err, rows) => {
            if (err) return console.error("Error retrieving posts: ", err);
            if (rows.affectedRows > 0) res.status(201).send({ msg: 'Post created' });
        })
    } catch (error) {
        console.error("Error creating post: ", error)
    }
})

router.delete('/:postID', (req, res) => {
    const { postID } = req.params;
    try {
        db.query(`DELETE FROM posts WHERE id=${postID}`, (err, rows) => {
            if (err) return console.error("Error deleting posts: ", err);
            if (rows.affectedRows > 0) {
                res.status(201).send({ msg: 'Post deleted' })
            }
        })
    } catch (error) {
        console.error("Error deleting post: ", error)
    }
})

module.exports = router;