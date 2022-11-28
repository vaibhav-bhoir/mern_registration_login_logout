import express from 'express';
import authJwt from '../middleware/authJwt.js';
import { allAccess, userBoard, moderatorBoard, adminBoard } from '../controllers/user.controller.js';

const router = express.Router();
// export default function (app) {
//     app.use(function (req, res, next) {
//         res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
//         next();
//     });

//     app.get('/api/test/all', allAccess);

//     app.get('/api/test/user', [authJwt.verifyToken], userBoard);

//     app.get('/api/test/mod', [authJwt.verifyToken, authJwt.isModerator], moderatorBoard);

//     app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], adminBoard);
// }

router.get('/all', allAccess);
router.get('/user', [authJwt.verifyToken], userBoard);
router.get('/mod', [authJwt.verifyToken, authJwt.isModerator], moderatorBoard);
router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], adminBoard);

export default router;
