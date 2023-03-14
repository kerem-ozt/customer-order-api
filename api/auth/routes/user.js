import express from 'express';
import UserControllers from '../controllers/user.js';
import {verifyToken} from '../../utils/general/auth.js';
import authorization from '../../utils/general/authorization';

// eslint-disable-next-line new-cap
const UserRouter = express.Router();

UserRouter.get('/getall', verifyToken, authorization.authorizeUser(7), UserControllers.getAll);
UserRouter.post('/register', UserControllers.register);
UserRouter.post('/login', UserControllers.login);
UserRouter.get('/logout', UserControllers.logout);
UserRouter.delete('/delete/:id', verifyToken, authorization.authorizeUser(8), UserControllers.delete);
// UserRouter.put('/refresh', UserControllers.refresh);

export default UserRouter;