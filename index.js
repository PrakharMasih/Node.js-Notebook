const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/notes_app')
    .then(result => {

        const userRoute = require('./api/Routes/users.js');
        const noteRoute = require('./api/Routes/notes.js');

        
        app.use(morgan('dev'));

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        app.use(cors());

        app.use('/api/user', userRoute);                           //user : signup login delete
        app.use('/api/note', noteRoute);                           //note : get post update delete CRUD

        app.use((req, res, next) => {
            const error = new Error('Page Not found');
            error.status = 404;
            next(error);
        });

        app.use((error, req, res, next) => {
            res.status(error.status || 500);
            res.json({
                message: error.message
            });
        });

        app.listen(8000, () => {
            console.log("server is running on 8000");
        });
    })
    .catch(err => console.log(err));

