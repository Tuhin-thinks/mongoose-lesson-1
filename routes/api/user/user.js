const { Router } = require('express');
const { UserModel } = require('../../../db/models/userModel');
const path = require('path');

const UserRouter = Router();

UserRouter.get('/', (req, res) => {
    res.json({ message: 'Hello from the API! GET:users' });
});

/**
 * @route POST /api/users
 * @description Register new user
 */
UserRouter.post('/register', async (req, res) => {
    const { name, password, email } = req.body;

    // create a new using using UserModel
    const newUser = new UserModel({
        name,
        password,
        email,
        company: 'Company Name',
        verified: false,
        enabled: true,
        role: 'user',
        simulationLimit: 0,
        coreHoursLimit: 0,
        coreHoursConsumed: '0',
        prefs: {
            jobs: {
                local: {
                    jobDirectory: path.join(process.env.ASSETS_DIR, 'jobs'),
                },
            },
        },
    });

    // save the user to the database
    const result = await newUser.save();

    // send the result without the password
    res.json({
        message: 'User created successfully!',
        result: {
            ...result._doc,
            password: undefined,
        },
    });
});

/**
 * @route POST /api/users/login
 * @description Login user
 * @access Public
 */
UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // find the user in the database
    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
        return res.status(401).json({ message: 'Invalid login credentials' });
    } else {
        const passwordMatch = user.comparePassword(password);
        if (!passwordMatch) {
            return res
                .status(401)
                .json({ message: 'Invalid login credentials' });
        } else {
            // send the user without the password
            res.json({
                message: 'Login successful!',
                result: {
                    ...user._doc,
                    id: user._id,
                    password: undefined,
                    _id: undefined,
                },
            });
        }
    }
});

/**
 * @route GET /api/users/:userid
 * @description Get user by id
 * @access Authenticated
 * end point to get user by id
 */
UserRouter.get('/:userid', async (req, res) => {
    const { userid } = req.params;

    console.log('userid', userid);

    // find the user in the database
    const user = await UserModel.findById(userid).exec(); // FIXME: using userid directly is a vulnerability (Injection attack)

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    } else {
        // send the user without the password
        res.json({
            message: 'User found!',
            result: {
                ...user._doc,
                id: user._id,
                _id: undefined,
                password: undefined,
            },
        });
    }
});

module.exports = UserRouter;
