import OrderServices from '../services/order.js';
// import Joi from '@hapi/joi';
import OrderValidation from '../validations/order.js';

/**
 * @typedef request
 * @property {date} date.required
 * @property {integer} customer_id.required - Some description for point - eg: 1234
 */

/**
 * @swagger
 * @route GET /order/getall
 * @summary endpoint for getting all orders
 * @group Order
 * @returns {array} 200 - An array of orders info
 * @returns {Error} default - Internal server error
 *
 * @typedef Order
 *
 */

/**
 * @swagger
 * @route POST /order/create
 * @summary endpoint for create new order
 * @group Order
 * @param {request.model} body.body.required
 * @returns {orders} 200 - Created order object
 * @returns {Error} default - Internal server error
 *
 * @typedef Order
 *
 */

/**
 * @swagger
 * @route DELETE /order/delete
 * @summary endpoint for delete exist order
 * @group Order
 * @returns {object} 200 - Deleted status
 * @returns {Error} default - Internal server error
 *
 * @typedef Order
 *
 */

class OrderControllers {

	static async getAll (req, res) {

		try {
			let orders = await OrderServices.getAll();
			if (!orders.type){
				return res.json({ type: false, message: orders.message });
			}
			return res.json( { type: true, message: orders.message, data: orders.data} );
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}
    
	static async create (req, res) {

		try {

			const validation = await OrderValidation.validateCreate(req.body);

			if (!validation.type) {
				return res.json({type: false, message: validation.message});
			}
			
			let order = await OrderServices.create(req);
			
			return res.json({ type: order.type, message: order.message, data: order.data});
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}
    
	static async delete (req, res) {
        
		try {
		    let order = await OrderServices.delete(req);
			if (order) {
				return res.send({type: order.type, message: order.message});
			}
			else {
				return res.send({type: order.type, message: order.message});
			}
		}
		catch (error) {
			return res.json({ type: false, message: error.message});
		}
	}

}

export default OrderControllers;