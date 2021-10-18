import express from 'express';
import { getUserData, createUser } from '../../controllers/login/userData.js';

const router = express.Router();

router.post('/getUserData', getUserData);
router.post('/createUser', createUser);
export default router;