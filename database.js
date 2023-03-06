import Sequelize from 'sequelize';

const sequelize = new Sequelize ('busonolsun', 'postgres', 'password', {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
});

export default sequelize;