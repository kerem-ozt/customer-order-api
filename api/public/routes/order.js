import express from 'express';
import OrderControllers from '../controllers/order';
//import authorization from '../../utils/general/authorization';

// eslint-disable-next-line new-cap
const OrderRouter = express.Router();
//authorization.authorizeUser(1),
OrderRouter.get('/getall', OrderControllers.getAll);
OrderRouter.get('/get/:id', OrderControllers.getOrderById);
OrderRouter.post('/create', OrderControllers.create);
OrderRouter.delete('/delete/:id', OrderControllers.delete);

//OrderRouter.get('/get', OrderControllers.getMyOrder);

//OrderRouter.delete('/del', OrderControllers.deleteMyOrder);

export default OrderRouter;