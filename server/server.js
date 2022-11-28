import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
// import db from './app/models/index.js';
import Role from './app/models/role.model.js';
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';

const app = express();
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// const Role = db.role;

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        initial();
        console.log('Connected to mongoDB.');
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!');
});

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my application.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/test', userRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'user',
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: 'moderator',
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: 'admin',
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
