import {Router} from 'express';
import {createAdmin} from '../../controller/log/signUpControl.js'
const router = Router();


router.post('/',createAdmin);

export default router;
