const { model } = require('mongoose');
const { UserSchema } = require('../schemas/userSchema');

module.exports.UserModel = model('User', UserSchema);
