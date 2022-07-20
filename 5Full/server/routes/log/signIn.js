import {Router} from 'express';
import {signIn} from '../../controller/log/signInControl.js'
const router = Router();


router.post('/auth',signIn);

export default router;