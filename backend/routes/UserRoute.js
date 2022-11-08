import express from 'express';
import { getUsers } from '../controllers/UserControllers.js';

const router = express.Router();

router.get('/users', getUsers);

export default router;