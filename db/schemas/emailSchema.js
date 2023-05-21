const { Schema } = require('mongoose');

const emailSchema = {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // can also add a custom validator
};

module.exports = { emailSchema };
