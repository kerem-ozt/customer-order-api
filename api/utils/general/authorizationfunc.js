import db from '../../src/models/index.js';

class hadibakim {
	
	static async authorizeUser(req, permId) {
		try {
			const user = await db.users.findOne({
				where: { id: req.session.userid },
				include: {
					model: db.userRoles, as: 'userRoles',
					include: {
						model: db.permissions, as: 'permissions',
						where: { id: permId },
						through: []
					},
					through: []
				}
			});

			console.log('USER:', user.userRoles[0].permissions[0].id);
			if (user.userRoles[0].permissions[0]!==undefined && user.userRoles[0].permissions[0].id === permId) {
				return ({type: true, message: 'Authorized'});
			}
			else {
				return ({type: false, message: 'Unauthorized'});
			}
		}
		catch (error) {
			return ({type: false, message: error.message});
		}
	}

}

export default hadibakim;