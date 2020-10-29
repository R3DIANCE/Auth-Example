const express = require('express');
const db = require('./../db/connection');
const users = db.get('user_accounts');

const router = express.Router();

router.get('/all', async (req, res, next) => {
    const stats = {
        userCount: 0,
        adminCount: 0,
    };

    const userCount = await users.count();
    const adminCount = await users.count({ role: 'admin' });

    stats.userCount = userCount;
    stats.adminCount = adminCount;

    res.json(stats);
});

module.exports = router;
