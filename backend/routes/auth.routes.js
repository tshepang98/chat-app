//auth.routes.js
import express from 'express';
import { signUp, loginUser, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', loginUser);
router.post('/logout', logout);

export default router;
