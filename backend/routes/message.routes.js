//message.routes.js
import express from 'express';
import { getMessage, sendMessage } from '../controllers/message.controller.js';
import protectRoute from './middleware/protectRoute.js';

const router = express.Router();

router.post('/:id', protectRoute, getMessage);
router.post('/send/:id', protectRoute, sendMessage);


export default router;
