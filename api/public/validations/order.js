import Joi from '@hapi/joi';

class OrderValidation {
    
	static async validateCreate (body) {
		
		try {
		
			const schema = Joi.object({
				date: Joi.date().required(),
				customer_id: Joi.number().integer().required()
			});
		
			const { error } = schema.validate(body);
		
			if (error) {
				return {type: false, message: error.message};
		    }

			else {
				return {type: true, message: 'Validation success'};
			}
		}

		catch (err) {
			return {type: false, message: err.message};
		
		}
		
	}

}

export default OrderValidation;