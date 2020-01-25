import { Router } from 'express';
import * as controller from './UserController';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';

const path = '/users';
const router = Router();

// route
// --- Get Me ---
router.get('/getme', authMiddleware, requireLogin, throwAsNext(controller.getMe));
// --- Follow ---
router.post('/follow/:id', authMiddleware, requireLogin, throwAsNext(controller.follow));
// --- Unfollow ---
router.post('/unfollow/:id', authMiddleware, requireLogin, throwAsNext(controller.unfollow));
// --- Post ---
router.post('/post', authMiddleware, requireLogin, throwAsNext(controller.createPost));
// registerSubrouter

// export
export default { path, router };
