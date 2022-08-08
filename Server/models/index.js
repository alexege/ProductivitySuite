const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');
db.notebook = require('./notebook.model');
db.subject = require('./subject.model');
db.category = require('./category.model');
db.note = require('./note.model');
db.refreshToken = require('./refreshToken.model');

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
