import express from 'express';
import UserControllers from '../controllers/user.js';
import {verifyToken} from '../../utils/general/auth.js';

// eslint-disable-next-line new-cap
const UserRouter = express.Router();

UserRouter.get('/getall', verifyToken, UserControllers.getAll);
//UserRouter.get('/getall', UserControllers.getAll);
UserRouter.post('/register', UserControllers.register);
UserRouter.post('/login', UserControllers.login);
UserRouter.get('/logout', UserControllers.logout);
UserRouter.delete('/delete/:id', UserControllers.delete);
// UserRouter.put('/refresh', UserControllers.refresh);

export default UserRouter;