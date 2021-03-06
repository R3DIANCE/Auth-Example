const { encryptPassword, verifyPassword } = require('./auth.hash');
const jwt = require('jsonwebtoken');

const users = require('./auth.model');

const createTokenSendResponse = (user, res, next) => {
    const payload = {
        _id: user._id,
        username: user.username,
        role: user.role,
        active: user.active,
    };
    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: '1d',
        },
        (err, token) => {
            if (err) {
                res.status(422);
                const error = Error('Unable to login');
                next(error);
            } else {
                // login all good
                res.json({ token });
            }
        }
    );
};

const get = (req, res) => {
    res.json({
        message: 'Hello Auth! 🔐',
    });
};

const signup = async (req, res, next) => {
    console.log(req.body);
    console.log('Hi');
    try {
        const hashed = await encryptPassword(req.body.password);
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashed,
            role: 'user',
            active: true,
        };
        const insertedUser = await users.insert(newUser);
        createTokenSendResponse(insertedUser, res, next);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await verifyPassword(req.body.password, req.loggingInUser.password);
        if (result) {
            createTokenSendResponse(req.loggingInUser, res, next);
        } else {
            res.status(422);
            throw new Error('Unable to login');
        }
    } catch (error) {
        res.status(res.statusCode === 200 ? 500 : res.statusCode);
        next(error);
    }
};

module.exports = {
    get,
    login,
    signup,
};
