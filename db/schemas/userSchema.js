const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');
const { emailSchema } = require('./emailSchema');
const { getRequiredSchema } = require('./commonSchema');

const stringRequiredSchema = getRequiredSchema({
    type: String,
    required: true,
});

const UserSchema = new Schema({
    name: stringRequiredSchema,
    company: stringRequiredSchema,
    email: emailSchema,
    password: stringRequiredSchema,
    verified: Boolean,
    enabled: Boolean,
    role: stringRequiredSchema,
    simulationLimit: Number,
    coreHoursLimit: Number,
    coreHoursConsumed: stringRequiredSchema,
    prefs: {
        sites: {
            type: Array,
            default: ['site-1', 'site-2', 'site-3'],
        },
        jobs: {
            general: {
                noOfProcessors: {
                    type: String,
                    default: '1',
                },
            },
            local: {
                jobDirectory: stringRequiredSchema,
            },
            rescale: {
                RESCALE_API: {
                    type: String,
                    default: '', // default is empty string if rescale api is not provided
                },
            },
            onPremiseLinux: Object, // TODO: Finalize this
        },
    },
    simulationsPerformed: {
        type: Number,
        default: 0,
        required: true,
    },
    unitSystems: Array,
    impellers: {
        type: Array,
        default: [],
    },
});

// creating a password setter
UserSchema.path('password').set((password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    console.log('hash: ', hash);
    return hash;
});

// creating a password validator
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = {
    UserSchema,
};
