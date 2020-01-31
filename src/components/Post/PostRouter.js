import { Router } from 'express';
import * as controller from './PostController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/posts';
const router = Router();

// route
// --- Create Post ---
router.post('/', authMiddleware, requireLogin, throwAsNext(controller.createPost));
// --- Get List Post ---
router.get('/', authMiddleware, requireLogin,
  paginationMiddleware({
    maxSize: 20,
    defaultSize: 10,
  }),
  throwAsNext(controller.getPost));
// --- Get Post By User ---
router.get('/user/:id', authMiddleware, requireLogin,
  paginationMiddleware({
    maxSize: 20,
    defaultSize: 10,
  }),
  throwAsNext(controller.getPostByUserId));
// registerSubrouter

// export
export default { path, router };
