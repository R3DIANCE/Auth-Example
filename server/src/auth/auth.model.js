const db = require('./../db/connection');

const users = db.get('user_accounts');
users.createIndex('username', { unique: true });

module.exports = users;
