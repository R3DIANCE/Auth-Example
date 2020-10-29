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
    try {
        const result = await users.find({}, '-password');
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    const { id: _id } = req.params;
    // validate id params
    try {
        // validate req body
        const result = schema.validate(req.body);
        if (!result.error) {
            // if valid: find user in db with given id
            const query = { _id };
            const user = await users.findOne(query);
            if (user) {
                // update user in db
                const updatedUser = req.body;
                if (updatedUser.password) {
                    updatedUser.password = encryptPassword(updatedUser.password);
                }
                const result = await users.findOneAndUpdate(query, {
                    $set: updatedUser,
                });
                // respond with user
                delete result.password;
                res.json(result);
            } else {
                // if not exists - send 404 (with user not found)
                next();
            }
        } else {
            // if not valid - send an error with the reason
            res.status(422);
            throw new Error(result.error);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    list,
    updateOne,
};
