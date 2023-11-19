require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const tasksRoutes = require('./routes/tasksRoutes')
const userRoutes = require('./routes/userRoutes');

// express app
const app = express();

// middleware

    // express json
app.use(express.json());

    // logger
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});




//routes
app.use('/api/user', userRoutes)

app.use('/api/tasks', tasksRoutes)

// db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db && listening on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    });



