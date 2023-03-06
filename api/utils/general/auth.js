import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../src/models/index.js';

export function verifyToken(req, res, next) {
	const token = req.session.token;

	if (!token) {
		return res.status(403).send('A token is required for authentication');
	}

	try {
		const decoded = jwt.verify(token, dotenv.config().parsed.TOKEN_SECRET);
		req.user = decoded;
	}

	catch (err) {
		const user = db.users.findOne({where: {id: req.session.userid}});
		const refreshToken = user.refreshToken;
		
		if (refreshToken){
			jwt.verify(refreshToken, dotenv.config().parsed.TOKEN_SECRET,
		 	(error) => {
		 		if (error) {
						return res.status(401).send('Unauthorized');
		 		}
		 		else {
		 			const accessToken = generateAccessToken({ username: user.id });
		
		 			req.session.userid = user.id;
		 			req.session.token = accessToken;
					
						return res.status(200).send('Token Refreshed'); 
					}
				}
			);
		}
		else {
			return res.status(401).send('Invalid Token');
		}
	}
	return next();
}

export function generateAccessToken(username) {
	return jwt.sign(username, dotenv.config().parsed.TOKEN_SECRET, { expiresIn: '10s' });
}

export function generateRefreshToken(username) {
	return jwt.sign(username, dotenv.config().parsed.TOKEN_SECRET, { expiresIn: '600s' });
}