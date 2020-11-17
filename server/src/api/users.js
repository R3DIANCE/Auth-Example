const express = require('express');
const controller = require('../controllers/users.controller');

const router = express.Router();

router.get('/', controller.list);
router.post('/manage/toggleactive', controller.toggleActiveState);

module.exports = router;
