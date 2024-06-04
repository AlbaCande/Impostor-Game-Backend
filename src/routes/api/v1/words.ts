import { Router as routerInitializer } from 'express';
import { findRandomWord } from '../../../controllers/api/v1/words';

const router = routerInitializer();

router.get('/random', findRandomWord);

export default router;
