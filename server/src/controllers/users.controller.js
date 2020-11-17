const Joi = require('joi');
const { encryptPassword, verifyPassword } = require('../auth/auth.hash');
const db = require('../db/connection');

const users = db.get('user_accounts');
const schema = Joi.object({
    username: Joi.string()
        .regex(/(^[a-zA-Z0-9_]*$)/)
        .min(2)
        .max(30),
    password: Joi.string().trim().min(8),
    role: Joi.string().valid('user', 'admin'),

    active: Joi.bool(),
});

const list = async (req, res, next) => {
    const result = await users.find({}, { projection: { email: 0, password: 0 }, limit: 10 });
    if (result) {
        console.log(result);
        res.json(result);
    } else if (error) {
        next(error);
    }
};

const toggleActiveState = async (req, res, next) => {
    const update = await users.findOneAndUpdate(
        {
            _id: req.body._id,
        },
        {
            $set: { active: !req.body.active },
        }
    );

    if (update) {
        res.json(update);
    } else {
        next();
    }
};

module.exports = {
    list,
    toggleActiveState,
};
