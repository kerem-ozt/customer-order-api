import db from '../../src/models/index.js';

class authorizeUser {
	
	static authorizeUser(permId) {
		return async (req, res, next) => {
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

				// const userInfo = JSON.parse(JSON.stringify(user));

				// if (userInfo.Roles.length > 0 && userInfo.Roles[0].Permissions[0].id === permId) {
				if (user.userRoles[0].permissions[0]!==undefined && user.userRoles[0].permissions[0].id === permId) {
					next();
				}
				else {
					return res.send({type: false, message: 'Unauthorized'});

					//return ({type: false, message: 'Unauthorized'});

					//return res.status(401).json({ type: false, message: 'Unauthorized' });
				}
			}
			catch (error) {
				return res.send({type: false, message: error.message});
				
				//return ({type: false, message: error.message});
				
				//return res.status(500).json({ type: false, message: error.message });
			}
		};
	}

}

export default authorizeUser;