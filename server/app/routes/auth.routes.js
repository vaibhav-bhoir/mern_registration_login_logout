import express from 'express';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middleware/verifySignUp.js';
import { signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', [checkDuplicateUsernameOrEmail, checkRolesExisted], signup);
router.post('/signin', signin);

export default router;
