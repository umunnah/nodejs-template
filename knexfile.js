
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./.env" });

const connections = {
	development: {
		client: process.env.DB_CLIENT,
		connection: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "sys_migrations",
			directory: path.resolve(path.dirname(""), "src/database/migrations"),
		},
		seeds: {
			directory: path.resolve(path.dirname(""), "src/database/seeds"),
		},
		acquireConnectionTimeout: 10000, // to timeout in 10
	},
	testing: {
		client: "sqlite3",
		connection: path.resolve(path.dirname(""), "src/tests/test.db"),
    useNullAsDefault: true,
    migrations: {
			tableName: "sys_migrations",
			directory: path.resolve(path.dirname(""), "src/database/migrations"),
		},
		seeds: {
			directory: path.resolve(path.dirname(""), "src/database/seeds"),
		},
	},
	production: {
		client: process.env.DB_CLIENT,
		connection: process.env.DATBASE_URL,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "sys_migrations",
			directory: path.resolve(path.dirname(""), "src/database/migrations"),
		},
		seeds: {
			directory: path.resolve(path.dirname(""), "src/database/seeds"),
		},
		acquireConnectionTimeout: 10000, // to timeout in 10
	},
};


module.exports = connections[process.env.NODE_ENV.trim() || "development"]