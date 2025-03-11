import { Router } from 'express';
import { login, register, logout } from '../controllers/auth.controller';
import { handleAsyncErrors } from '../utils/handleAsyncErrors';


const router = Router();

router.post('/login', handleAsyncErrors(login));
router.post('/register', handleAsyncErrors(register));
router.post('/logout', handleAsyncErrors(logout));

export default router;