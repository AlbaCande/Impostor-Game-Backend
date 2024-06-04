import { Router as routerInitializer } from 'express';
import wordsRouter from './words';

const router = routerInitializer();

router.use('/words', wordsRouter);

export default router;
