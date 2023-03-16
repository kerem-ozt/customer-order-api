import db from '../../src/models/index.js';
import {generateAccessToken, generateRefreshToken} from '../../utils/general/auth.js';
import { createHash } from 'node:crypto';
import getLanguage from '../../utils/general/getLanguage.js';

class UserService {

	static async getAll (req, language) {

		try {
		
			let users = await db.users.findAll({
				include: [ {
					model: db.orders, as: 'orders',
					include: [ {
						model: db.items, as: 'items'
					} ]
				  } ]
			  });

			  return {type: true, message: getLanguage(language, 'user_getAll_success'), data: users};

		}

		catch (err) {

			return {type: false, message: getLanguage(language, 'user_getAll_fail'), err};

		}
	}

	static async register (req, language) {
		
		try {
		
			const {name, password, phone, email} = req.body;
			const oldUser = await db.users.findOne({where: {name}});
		
			if (oldUser) {
		
				return {type: true, message: getLanguage(language, 'user_already_exists')};
		
			}
		
			const encryptedPassword = createHash('md5').update(password).digest('hex');
			const user = await db.users.create({
				name,
				password: encryptedPassword,
				phone,
				email,
				refresh_token: null
			});
		
			return {type: true, message: getLanguage(language, 'user_register_success'), data: user};
		
		}
		
		catch (err) {
		
			return {type: false, message: getLanguage(language, 'user_register_fail'), err};
		
		}
	}

	static async delete (req, language) {

		try {
		
			let {id} = req.params;
			let deletedUser = await db.users.findByPk(id);
		
			if (deletedUser) {
				await deletedUser.update({is_removed: true});
				return {type: true, message: getLanguage(language, 'user_delete_success')};
		
			}
		
			else {
		
				return {type: false, message: getLanguage(language, 'user_not_found')};
		
			}
		}
		
		catch (err) {
		
			return {type: false, message: getLanguage(language, 'user_delete_fail'), err};
		
		}
	}

	static async login (req, language) {
		
		try {
		
			const {name, password} = req.body;
			const user = await db.users.findOne({where: {name}});

			if ( user && createHash('md5').update(password).digest('hex') === user.password) {
		
				const token = generateAccessToken({ username: user.id });
				
				req.session.userid = user.id;
				req.session.token = token;
				
				const refreshToken = generateRefreshToken({ username: user.id });

				await db.users.update(
					{refresh_token: refreshToken},
					{ where: { id: user.id } }
				);

				return ({ type: true, data: user, message: getLanguage(language, 'user_login_success')});
				
			}
		
			else {
		
				return { type: false, message: getLanguage(language, 'user_login_fail')}; 
		
			}
		}
		
		catch (err) {
		
			return {type: false, message: getLanguage(language, 'user_login_fail'), err};
		
		}
	}

	static async logout (req, language) {
		
		try {
		
			req.session.destroy();
			return { type: true, message: getLanguage(language, 'user_logout_success')};
		
		}
		
		catch (err) {
		
			return {type: false, message: getLanguage(language, 'user_logout_fail'), err};
		
		}
	}

	/*
	 * static async refresh (req) {
	 * 	let name = 'kerem';
	 * 	const user = await db.users.findOne({where: {name}});
	 * 	const refreshToken = user.refresh_token;
	 * 	console.log ('REFRESHTOKEN:', refreshToken);
	 * 	if (refreshToken){
	 * 		console.log('1');
	 * 		// const refreshToken = db.users.refresh_token;
	 * 		console.log('REFRESHTOKEN:', refreshToken);
	 * 		jwt.verify(refreshToken, dotenv.config().parsed.TOKEN_SECRET,
	 * 			(err) => {
	 * 				if (err) {
	 * 					console.log('1.1:', err);
	 * 					return { type: false, message: 'Unauthorized' };
	 * 				}
	 * 				else {
	 * 					console.log('1.2');
	 * 					// const user = db.users.findOne({where: {name}  });
	 * 					const accessToken = generateAccessToken({ username: user.id });
	 */

	/*
	 * 					req.session.userid = user.id;
	 * 					req.session.token = accessToken;
	 */

	/*
	 * 					return {type: true, message: 'refreshed'}; 
	 * 				}
	 * 			}
	 * 		);
	 * 	}
	 * 	else {
	 * 		console.log('2');
	 * 		return {type: false,  message: 'Unauthorized' };
	 * 	}
	 * }
	 */
	
}
export default UserService;