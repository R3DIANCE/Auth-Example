const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();

const app = express();
const rateLimit = require('express-rate-limit');
const middleware = require('./auth/auth.middlewares');
const auth = require('./auth/auth.routes');
const stats = require('./api/stats');
const users = require('./api/users');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(volleyball);
app.use(
    cors({
        origin: '*',
    })
);
app.use(express.json());
app.use(helmet());
app.use(middleware.checkTokenSetUser);

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
        user: req.user,
    });
});

app.use('/auth', auth);
app.use('/api/v1/stats', middleware.isAdmin, stats);
app.use('/api/v1/users', middleware.isLoggedIn, middleware.isAdmin, users);

function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack,
    });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
