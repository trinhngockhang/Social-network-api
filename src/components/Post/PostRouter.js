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
// registerSubrouter

// export
export default { path, router };
