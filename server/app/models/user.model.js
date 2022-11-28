import mongoose from 'mongoose';

const User = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
        },
    ],
});

export default mongoose.models.User || mongoose.model('User', User);
