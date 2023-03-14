import Joi from '@hapi/joi';

class UserValidation {
    
	static async validateRegister (body) {
		
		try {
		
			const schema = Joi.object({
				name: Joi.string().min(3).required(),
				password: Joi.string().required(),
				phone: Joi.string().required(),
				email: Joi.string().email().required()
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

export default UserValidation;