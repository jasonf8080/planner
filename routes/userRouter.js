import express from 'express'
const app = express();
const router = express.Router();

import { register, login, logout, getCurrentUser } from '../controllers/userController.js';
import authenticateUser from '../middleware/auth.js';

// router.route('/testing').get(test)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/getCurrentUser').get(authenticateUser ,getCurrentUser)


export default router