import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../src/models/index.js';

export async function verifyToken(req, res, next) {
	try {
		const token = req.session.token;
		if (!token) {
			return res.status(401).send('A token is required.');
		}
		else {
			jwt.verify(token, dotenv.config().parsed.TOKEN_SECRET, async (err, decoded) => {
				if (err) {
					const user = await db.users.findOne({where: {id: req.session.userid}});
					const refreshToken = user.refresh_token;
					if (refreshToken){
						jwt.verify(refreshToken, dotenv.config().parsed.TOKEN_SECRET, async (err2, decoded2) => {
             	if (err2) {
								return res.status(401).send('Invalid Refresh Token.');
             	}
             	else {
             		const newToken = generateAccessToken({ username: user.id });
             		console.log('new token generated');
             		req.session.token = newToken;
             		req.user = decoded2;
             	}
						});
					}
					else {
						return res.status(401).send('No Refresh Token.');
					}
				}
				else {
					req.user = decoded;        
				}
			});
		}
	}
	catch (err) {
		return res.status(401).send(err.message);
	}
	return next();
}

export function generateAccessToken(username) {
	return jwt.sign(username, dotenv.config().parsed.TOKEN_SECRET, { expiresIn: '60s' });
}

export function generateRefreshToken(username) {
	return jwt.sign(username, dotenv.config().parsed.TOKEN_SECRET, { expiresIn: '600s' });
}