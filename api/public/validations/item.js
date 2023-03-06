import Joi from '@hapi/joi';

class ItemValidation {
    
	static async validateCreate (body) {
		
		try {
		
			const schema = Joi.object({
				name: Joi.string().required(),
				price: Joi.number().integer().required()
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

export default ItemValidation;