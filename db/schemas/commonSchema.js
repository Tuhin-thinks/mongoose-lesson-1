const { Schema } = require('mongoose');

// to add required constraint to a field, add required: true to the field
function getRequiredSchema({ type, required }) {
    return {
        type: type,
        required: required,
    };
}

// to add unique constraint to a field, add unique: true to the field
function getUniqueSchema({ type, unique }) {
    return new Schema({
        type: type,
        unique: unique,
    });
}

module.exports = { getRequiredSchema, getUniqueSchema };
