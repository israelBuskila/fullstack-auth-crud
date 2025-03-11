import express from 'express';
import { getUser, createUser, updateUser, deleteUser, getUsers } from '../controllers/user.controller';
import { handleAsyncErrors } from '../utils/handleAsyncErrors';

const router = express.Router();

router.get('/', handleAsyncErrors(getUsers));

router.get('/:id', handleAsyncErrors(getUser));

router.post('/', handleAsyncErrors(createUser));

router.put('/:id', handleAsyncErrors(updateUser));

router.delete('/:id', handleAsyncErrors(deleteUser));

export default router;