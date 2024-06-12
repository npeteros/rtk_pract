require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const config = process.env;

const authRoutes = require('./server/routes/authRoutes');
const postRoutes = require('./server/routes/postRoutes');
const userRoutes = require('./server/routes/userRoutes')

const authJWT = require('./server/middleware')

app.use(bodyParser.json());
app.use(cors())

app.use('/auth', authRoutes);
app.use('/posts', postRoutes)
app.use('/users', userRoutes);
app.get('/validate/:uID', authJWT, (req, res) => {
    res.status(201).send(req.user);
})


app.listen(config.PORT, () => {
    console.log(`App is listening on port ${config.PORT}`);
})