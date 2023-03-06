import express from 'express';
import ItemControllers from '../controllers/item';

// eslint-disable-next-line new-cap
const ItemRouter = express.Router();

ItemRouter.get('/getall', ItemControllers.getAll);
ItemRouter.post('/create', ItemControllers.create);
ItemRouter.delete('/delete/:id', ItemControllers.delete);

export default ItemRouter;