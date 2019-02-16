import { Router } from 'express';
import chirpsRouter from './chirps';
import chargeRouter from './charge'

let router = Router();

router.use('/chirps', chirpsRouter);
router.use('/charge', chargeRouter)

export default router;