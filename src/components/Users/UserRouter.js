import { Router } from 'express';
import * as controller from './UserController';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';
import { commentValidator } from './Validator';

const path = '/users';
const router = Router();

// route
// --- Get Me ---
router.get('/getme', authMiddleware, requireLogin, throwAsNext(controller.getMe));
// --- Get User ---
router.get('/:id', authMiddleware, requireLogin, throwAsNext(controller.getUser));
// --- Follow ---
router.post('/follow/:id', authMiddleware, requireLogin, throwAsNext(controller.follow));
// --- Unfollow ---
router.post('/unfollow/:id', authMiddleware, requireLogin, throwAsNext(controller.unfollow));
// --- Post ---
router.post('/post', authMiddleware, requireLogin, throwAsNext(controller.createPost));
// --- Like ---
router.post('/like/:id', authMiddleware, requireLogin, throwAsNext(controller.like));
// --- Unlike ---
router.post('/unlike/:id', authMiddleware, requireLogin, throwAsNext(controller.unlike));
// --- Comment ---
router.post('/comment/:id', commentValidator, authMiddleware, requireLogin, throwAsNext(controller.comment));
// registerSubrouter

// export
export default { path, router };
