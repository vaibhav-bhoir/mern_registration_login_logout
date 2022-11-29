import express from 'express';
import { verifyToken, isAdmin, isModerator } from '../middleware/authJwt.js';
import { allAccess, userBoard, moderatorBoard, adminBoard } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/all', allAccess);
router.get('/user', [verifyToken], userBoard);
router.get('/mod', [verifyToken, isModerator], moderatorBoard);
router.get('/admin', [verifyToken, isAdmin], adminBoard);

export default router;
