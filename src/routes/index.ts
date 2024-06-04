import { Router as routerInitializer } from 'express';
import apiRouter from './api';

const router = routerInitializer();

router.use('/api', apiRouter);

export default router;
