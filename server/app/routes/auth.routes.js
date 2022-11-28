import express from 'express';
import verifySignUp from '../middleware/verifySignUp.js';
import controller from '../controllers/auth.controller.js';

const router = express.Router();

// export default function (app) {
//     app.use(function (req, res, next) {
//         res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
//         next();
//     });

//     app.post(
//         '/api/auth/signup',
//         [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
//         controller.signup
//     );

//     app.post('/api/auth/signin', controller.signin);
// }

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
router.post('/signin', controller.signin);

export default router;
