const jwt = require('jsonwebtoken');

const { schema, schema2 } = require('./auth.schema');
const users = require('./auth.model');

function checkTokenSetUser(req, res, next) {
    const authHeader = req.get('Authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1].toString();
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
                if (error) {
                    console.log(error);
                }
                req.user = user;
                next();
            });
        } else {
            next();
        }
    } else {
        next();
    }
}

function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        unAuthorized(res, next);
    }
}

function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        unAuthorized(res, next);
    }
}

function unAuthorized(res, next) {
    const error = new Error('🚫 Un-Authorized 🚫');
    res.status(401);
    next(error);
}

const validateUser = (defaultErrorMessage = '') => (req, res, next) => {
    let result;
    if (!req.body.email) {
        result = schema.validate(req.body);
    } else {
        result = schema2.validate(req.body);
    }

    if (!result.error) {
        next();
    } else {
        console.log()
        const error = defaultErrorMessage ? new Error(defaultErrorMessage) : result.error;
        res.status(422);
        next(error);
    }
};

const findUser = (defaultLoginError, isError, errorCode = 422) => async (req, res, next) => {
    try {
        const user = await users.findOne({
            username: req.body.username,
        });
        if (isError(user)) {
            res.status(errorCode);
            next(new Error(defaultLoginError));
        } else {
            req.loggingInUser = user;
            next();
        }
    } catch (error) {
        res.status(500);
        next(error);
    }
};

module.exports = {
    checkTokenSetUser,
    isLoggedIn,
    isAdmin,
    validateUser,
    findUser,
};
