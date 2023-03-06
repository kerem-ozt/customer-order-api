import ItemServices from '../services/item.js';
// import Joi from '@hapi/joi';
import ItemValidation from '../validations/item.js';

/**
 * @typedef request
 * @property {string} name.required
 * @property {integer} price.required - Some description for point - eg: 1234
 */

/**
 * @swagger
 * @route GET /item/getall
 * @summary endpoint for getting all items
 * @group Item
 * @returns {array} 200 - An array of items info
 * @returns {Error} default - Internal server error
 *
 * @typedef Item
 *
 */

/**
 * @swagger
 * @route POST /item/create
 * @summary endpoint for create new item
 * @group Item
 * @param {request.model} body.body.required
 * @returns {items} 200 - Created user object
 * @returns {Error} default - Internal server error
 *
 * @typedef Item
 *
 */

/**
 * @swagger
 * @route DELETE /item/delete
 * @summary endpoint for delete exist item
 * @group Item
 * @returns {object} 200 - Deleted status
 * @returns {Error} default - Internal server error
 *
 * @typedef Item
 *
 */

class ItemControllers {

	static async getAll (req, res) {

		try {
			let items = await ItemServices.getAll();

			if (!items.type){
				return res.json({ type: false, message: items.message });
			}
			return res.json( { type: true, message: items.message, data: items.data} );
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}

	static async create (req, res) {

		try {

			const validation = await ItemValidation.validateCreate(req.body);

			if (!validation.type) {
				return res.json({type: false, message: validation.message});
			}

			let item = await ItemServices.create(req);
			
			return res.json( { type: item.type, message: item.message, data: item.data} );
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}

	static async delete (req, res) {
		try {
			let item = await ItemServices.delete(req);
			if (item) {
				return res.send({type: item.type, message: item.message});
			}
			else {
				return res.send({type: item.type, message: item.message});
			}
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}

}

export default ItemControllers;