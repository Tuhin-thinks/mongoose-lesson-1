const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const ApiRouter = require('./routes/api/home');

const app = express();
const port = 3000;

process.env.ASSETS_DIR = __dirname + '/assets';
if (!fs.existsSync(process.env.ASSETS_DIR)) {
    fs.mkdirSync(process.env.ASSETS_DIR);
}

// create get route
app.use(express.json());

app.use('/api', ApiRouter);

app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);

    const db_connection_options = {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
    };
    const connection_uri = process.env.MONGO_URL + '/' + process.env.DB_NAME;
    await mongoose.connect(connection_uri, db_connection_options);
    console.log(`Connected to MongoDB: ${connection_uri}`);
});
