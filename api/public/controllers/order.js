import OrderServices from '../services/order.js';
// import Joi from '@hapi/joi';
import OrderValidation from '../validations/order.js';

/**
 * @typedef requestOrder
 * @property {date} date.required
 * @property {integer} customer_id.required - Some description for point - eg: 1234
 */

class OrderControllers {

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

	static async getAll (req, res) {

		try {
			let orders = await OrderServices.getAll(req, req.decoded.language);
			if (!orders.type){
				return res.json({ type: false, message: orders.message });
			}
			return res.json( { type: true, message: orders.message, data: orders.data} );
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}

	/**
	 * @swagger
	 * @route GET /order/get/{id}
	 * @param {string} id.path.required - ID
	 * @summary endpoint for getting all orders
	 * @group Order
	 * @returns {array} 200 - An array of orders info
	 * @returns {Error} default - Internal server error
	 *
	 * @typedef Order
	 *
	 */

	static async getOrderById (req, res) {

		try {
			let orders = await OrderServices.getOrderById(req, req.decoded.language);
			if (!orders.type){
				return res.json({ type: false, message: orders.message });
			}
			return res.json( { type: true, message: orders.message, data: orders.data} );
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}

	/**
	 * @swagger
	 * @route POST /order/create
	 * @summary endpoint for create new order
	 * @group Order
	 * @param {requestOrder.model} body.body.required
	 * @returns {orders} 200 - Created order object
	 * @returns {Error} default - Internal server error
	 *
	 * @typedef Order
	 *
	 */

	static async create (req, res) {

		try {

			const validation = await OrderValidation.validateCreate(req.body);

			if (!validation.type) {
				return res.json({type: false, message: validation.message});
			}
			
			let order = await OrderServices.create(req, req.decoded.language);
			
			return res.json({ type: order.type, message: order.message, data: order.data});
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}
    
	/**
	 * @swagger
	 * @route DELETE /order/delete/{id}
	 * @param {string} id.path.required - ID
	 * @summary endpoint for delete exist order
	 * @group Order
	 * @returns {object} 200 - Deleted status
	 * @returns {Error} default - Internal server error
	 *
	 * @typedef Order
	 *
	 */

	static async delete (req, res) {
        
		try {
		    let order = await OrderServices.delete(req, req.decoded.language);
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