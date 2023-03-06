import express from 'express';
import OrderControllers from '../controllers/order';

// eslint-disable-next-line new-cap
const OrderRouter = express.Router();

OrderRouter.get('/getall', OrderControllers.getAll);
OrderRouter.post('/create', OrderControllers.create);
OrderRouter.delete('/delete/:id', OrderControllers.delete);

export default OrderRouter;