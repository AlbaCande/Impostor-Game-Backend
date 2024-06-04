import { Router as routerInitializer } from 'express';
import v1Router from './v1';

const router = routerInitializer();
router.use('/v1', v1Router);

export default router;
