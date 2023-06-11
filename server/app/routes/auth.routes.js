import express from 'express';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middleware/verifySignUp.js';
import { signin, signup, forgotPassword, resetPassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', [checkDuplicateUsernameOrEmail, checkRolesExisted], signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:id/:token', resetPassword);

export default router;
