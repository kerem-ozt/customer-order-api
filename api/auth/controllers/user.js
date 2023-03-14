import UserService from '../services/user';
// import Joi from '@hapi/joi';
import UserValidation from '../../public/validations/user';

/**
 * @typedef request
 * @property {string} name.required
 * @property {string} password.required - Some description for point - eg: 1234
 */

class UserControllers {

	/**
	 * @swagger
	 * @route GET /user/getall
	 * @summary endpoint for getting all users
	 * @group Users
	 * @returns {array} 200 - An array of users info
	 * @returns {Error} default - Internal server error
	 *
	 * @typedef User
	 *
	 */

	static async getAll(req, res) {
		try {
			const result = await UserService.getAll();
			if (!result.type){
				return res.json({ type: false, message: result.message });
			}
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}

	/**
	 * @swagger
	 * @route POST /user/register
	 * @summary endpoint for create new user
	 * @group Users
	 * @param {request.model} body.body.required
	 * @returns {users} 200 - Created user object
	 * @returns {Error} default - Internal server error
	 *
	 * @typedef User
	 *
	 */
    
	static async register(req, res) {
    
		try {

			const validation = await UserValidation.validateRegister(req.body);

			if (validation.type === false) {
				return res.json({ type: false, message: validation.message });
			}

			let result = await UserService.register(req);
			
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			console.log(2);
			return res.json({ type: false, message: error.message });
		}
	}

	/**
	 * @swagger
	 * @route DELETE /user/delete/{id}
	 * @param {string} id.path.required - ID
	 * @summary endpoint for delete exist user
	 * @group Users
	 * @returns {object} 200 - Deleted status
	 * @returns {Error} default - Internal server error
	 *
	 * @typedef User
	 *
	 */

	static async delete(req, res) {
		try {
			let result = await UserService.delete(req);
			if (result) {
				return res.send({type: true, message: result.message});
			}
			else {
				return res.json({ type: false, message: result.message });
			}
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}

	/**
	 * @swagger
	 * @route POST /user/login
	 * @summary endpoint for create new token and login
	 * @group Users
	 * @param {request.model} body.body.required
	 * @returns {object} 200 - User object which logged in
	 * @returns {Error} default - Internal server error
	 *
	 * @typedef req
	 *
	 */

	static async login(req, res) {
		try {
			let result = await UserService.login(req);
			if (result) {
				return res.json({type: result.type, message: result.message, data: result.data});
			}
			else {
				return res.json({ type: false, message: result.message });
			}
		}
		catch (error) {
			return res.json({ type: false, message: error.message });
		}
	}

	/**
	 * @swagger
	 * @route GET /user/logout
	 * @summary endpoint for destroy session and log out
	 * @group Users
	 * @returns {object} 200 - Logout status
	 * @returns {Error} default - Internal server error
	 *
	 * @typedef User
	 *
	 */

	static async logout (req, res) {
		try {
			let result = await UserService.logout(req);
			return res.json({type: true, message: result.message});
		}
		catch (error) {
			return res.json({type: false, message: error.message});
		}
	}

}

export default UserControllers;
