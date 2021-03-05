module.exports = {
	database: {
		connectionLimit: 500,
		host: process.env.DATABASE_HOST || 'localhost',
		user: process.env.DATABASE_USER || 'root',
		password: process.env.DATABASE_PASSWORD || '123',
		database: process.env.DATABASE_NAME || 'dbMD',
	},
	port: process.env.PORT || 8080,
};
