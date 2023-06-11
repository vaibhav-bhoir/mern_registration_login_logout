import User from '../models/user.model.js';

export function allAccess(req, res) {
    res.status(200).send('Public Content.');
}

export function userBoard(req, res) {
    res.status(200).send('User Content.');
}

// export function adminBoard(req, res) {
//     res.status(200).send('Admin Content.');
// }

export function moderatorBoard(req, res) {
    res.status(200).send('Moderator Content.');
}

export const getAllUser = async (req, res) => {
    try {
        const allUsers = await User.find({}).populate('roles', 'name');
        res.status(200).send({ users: allUsers });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
