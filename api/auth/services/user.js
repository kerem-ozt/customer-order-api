import db from '../../src/models/index.js';
import {generateAccessToken, generateRefreshToken} from '../../utils/general/auth.js';
import { createHash } from 'node:crypto';

class UserService {

	static async getAll () {

		try {
		
			let users = await db.users.findAll({
				include: [ {
				  model: db.customers, as: 'customer',
				  include: [ {
						model: db.orders, as: 'orders',
						include: [ {
							model: db.items, as: 'items'
						} ]
				  } ]
				} ]
			  });

			  return {type: true, message: 'Succesfully Users Retrieved', data: users};

		}

		catch (err) {

			return {type: false, message: `Error while Paginating Users: ${err}`};

		}
	}

	static async register (req) {
		
		try {
		
			const {name, password} = req.body;
			const oldUser = await db.users.findOne({where: {name}});
		
			if (oldUser) {
		
				return {type: true, message: 'User already exists'};
		
			}
		
			const encryptedPassword = createHash('md5').update(password).digest('hex');
			const user = await db.users.create({
				name,
				password: encryptedPassword
			});
		
			return {type: true, message: 'Succesfully User Created', data: user};
		
		}
		
		catch (err) {
		
			return {type: false, message: `Error while creating User ${err}`};
		
		}
	}

	static async delete (req) {

		try {
		
			let {id} = req.params;
			let deletedUser = await db.users.findByPk(id);
		
			if (deletedUser) {
				await deletedUser.update({is_removed: true});
				return {type: true, message: 'Succesfully User Deleted'};
		
			}
		
			else {
		
				return {type: false, message: 'User not found'};
		
			}
		}
		
		catch (err) {
		
			return {type: false, message: `Error while deleting User ${err}`};
		
		}
	}

	static async login (req) {
		
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

				return ({ type: true, data: user, message: 'Logged in'});
				
			}
		
			else {
		
				return { type: false, message: 'Invalid credentials'}; 
		
			}
		}
		
		catch (err) {
		
			return {type: false, message: `Error while logging in User ${err}`};
		
		}
	}

	static async logout (req) {
		
		try {
		
			req.session.destroy();
			return { type: true, message: 'Logged out'};
		
		}
		
		catch (err) {
		
			return {type: false, message: `Error while logging out User ${err}`};
		
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