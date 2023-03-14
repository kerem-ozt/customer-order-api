import express from 'express';
import bodyParser from 'body-parser';
import sequelize from '../database';

import OrderRouter from './public/routes/order';
import ItemRouter from './public/routes/item';
import UserRouter from './auth/routes/user';

import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import { v4 as genuuid } from 'uuid';
import {verifyToken} from '../api/utils/general/auth.js';
import cors from 'cors';

const port = 3000;
const app = express();

const expressSwagger = require('express-swagger-generator')(app);

app.use(cookieParser());
const corsOptions = {
	origin: 'http://localhost:3000', 
	credentials: true
};
app.use(cors(corsOptions));

app.use(sessions(
	{ name: 'SessionCookie',
		genid: function() {
			return genuuid(); 
		}, 
		secret: 'Shsh!Secret!',
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 5 * 60000 }
		 
	}));

app.use(bodyParser.json());

let options = {
	swaggerDefinition: {
		info: {
			description: 'Customer - Order - Item',
			title: 'Customer - Order - Item',
			version: '1.0.0'
		},
		host: 'localhost:3000',
		basePath: '',
		produces: [
			'application/json',
			'application/xml'
		],
		schemes: [ 'http', 'https' ],
		securityDefinitions: {
			JWT: {
				type: 'apiKey',
				in: 'header',
				name: 'Authorization',
				description: ''
			}
		}
	},
	basedir: __dirname, 
	files: [ './**/*.js' ]
};
expressSwagger(options);

app.use('/order', verifyToken, OrderRouter);
app.use('/item', verifyToken, ItemRouter);
app.use('/user', UserRouter);

app.listen({port: 3000}, async () => {
	console.log(`listening ${port}`);
	await sequelize.authenticate();
	//await sequelize.sync({force: true});
	console.log('Database Connected!');
});

module.exports = app;