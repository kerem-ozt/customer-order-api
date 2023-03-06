import db from '../../src/models/index.js';

class OrderServices {

	static async getAll () {

		try {

			let orders = await db.orders.findAll();
			return {type: true, data: orders, message: 'Succesfully Orders Retrieved'};

		}

		catch (err) {

			return {type: false, data: null, message: `Error while Paginating Orders: ${err}`};

		}

	}
    
	static async create (req) {
		try {
			let createdOrder = await db.orders.create({
				date: req.body.date,
				customer_id: req.body.customer_id,
				created_at: new Date()
			});

			return { type: true, data: createdOrder, message: 'Succesfully Order Created'};
		}
		catch (err){

			return { type: false, message: `Error while creating Order: ${err}` };
		
		}
	}
    
	static async delete (req) {

		try {

			let {id} = req.params;
			let deletedOrder = await db.orders.findByPk(id);
			
			if (deletedOrder) {
				await deletedOrder.update({is_removed: true});
				return {type: true, message: 'Succesfully Order Deleted'};
			}
			
			else {
				return {type: false, message: 'Order not found'};
			}
		
		}
		
		catch (err) {
		
			return { type: false, message: `Error while deleting Order: ${err}` };
		
		}
	}

}

export default OrderServices;