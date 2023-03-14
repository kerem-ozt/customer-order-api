import express from 'express';
import ItemControllers from '../controllers/item';
import authorization from '../../utils/general/authorization';

// eslint-disable-next-line new-cap
const ItemRouter = express.Router();

ItemRouter.get('/getall', authorization.authorizeUser(4), ItemControllers.getAll);
ItemRouter.post('/create',  authorization.authorizeUser(6), ItemControllers.create);
ItemRouter.delete('/delete/:id',  authorization.authorizeUser(5), ItemControllers.delete);

export default ItemRouter;