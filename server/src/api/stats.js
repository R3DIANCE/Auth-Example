const express = require('express');
const fs = require('fs');
const os = require('os');
const { cpuPercentage } = require('../tasks/system');
const altLogs = require('../tasks/alt.interact');
const db = require('./../db/connection');
const users = db.get('user_accounts');

const router = express.Router();

router.get('/all', async (req, res, next) => {
    const userCount = await users.count();
    const adminCount = await users.count({ role: 'admin' });

    const ramPercentage = Math.round(100 - (os.freemem() / os.totalmem()) * 100);

    const stats = {
        userCount,
        adminCount,
        cpuPercentage: cpuPercentage(),
        ramPercentage,
        altLogs: await altLogs.getLogs(),
    };

    res.json(stats);
});

module.exports = router;
