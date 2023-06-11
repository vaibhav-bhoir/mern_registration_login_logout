import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import JsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { sign } = JsonWebToken;

export const signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles },
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map((role) => role._id);
                    user.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: 'User was registered successfully!' });
                    });
                }
            );
        } else {
            Role.findOne({ name: 'user' }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: 'User was registered successfully! you will be redirect to login in 3s' });
                });
            });
        }
    });
};

export const signin = (req, res) => {
    User.findOne({
        username: req.body.username,
    })
        .populate('roles', '-__v')
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: 'User Not found.' });
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Invalid Username or Password!',
                });
            }

            var token = sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
            });
        });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });

        if (!oldUser) {
            return res.status(404).send({ message: 'User Not Exists!!' });
        }
        const secret = process.env.JWT_SECRET + oldUser.password;
        const token = sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: '5m',
        });
        const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
        console.log(link);
        return res.status(201).send({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const resetPassword = async (req, res) => {
    console.warn('🚀 ~ file: auth.controller.js:129 ~ resetPassword ~ req:', req);

    const { id, token } = req.params;

    console.log('ID:', id);
    console.log('Token:', token);

    // TODO
};
