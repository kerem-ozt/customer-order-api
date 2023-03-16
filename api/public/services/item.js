/* eslint-disable no-unused-vars */
/* eslint-disable chai-friendly/no-unused-expressions */
import db from '../../src/models/index.js';
import { Op } from 'sequelize';
import getLanguage from '../../utils/general/getLanguage.js';

class ItemServices {

	static async getAll (req, language) {

		try {
			
			let where = {};

			if (req.body.ids && req.body.ids.length > 0) {
				where.id = {
					[Op.in]: req.body.ids
				};
			}

			else if (req.body.price && req.body.price.length > 0) {
				where.price = {
					[Op.between]: [ req.body.price.min, req.body.price.max ]
				};
			}

			let items = await db.items.findAll({where, order: [ [ 'id', 'DESC' ] ]});
			return {type: true, data: items, message: getLanguage(language, 'item_getAll_success')};
		
		}
		
		catch (err) {
		
			return {type: false, data: null, message: getLanguage(language, 'item_getAll_fail'), err};
		
		}
	}
    
	static async create (req, language) {
		
		try {
		
			let createdItem = await db.items.create({
				name: req.body.name,
				price: req.body.price,
				created_at: new Date()
			});
		
			return {  type: true, data: createdItem, message: getLanguage(language, 'item_create_success')};
		
		}
		
		catch (err) {
		
			return {type: false, data: null, message: getLanguage(language, 'item_create_fail'), err};
		
		}
	}
    
	static async delete (req, language) {
		
		try {
		
			let {id} = req.params;
			let deletedItem = await db.items.findByPk(id);
		
			if (deletedItem) {
		
				await deletedItem.update({is_removed: true});
				return { type: true, data: deletedItem, message: getLanguage(language, 'item_delete_success')};
		
			}
		
			else {
		
				return { type: false, data: null, message: getLanguage(language, 'item_not_found')};
		
			}
		}
		
		catch (err) {
		
			return {type: false, data: null, message: getLanguage(language, 'item_delete_fail'), err};
		
		}
	}

}

export default ItemServices;