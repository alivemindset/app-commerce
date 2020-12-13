require('dotenv').config()

module.exports = {
  name: 'default',
  type: 'mysql',
  host: process.env.DB_SERVER,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  migrations: [
    process.env.ENVIRONMENT === 'development' ? 'src/database/migrations/*.ts' : 'dist/src/database/migrations/*.js'
  ],
  entities: [
    process.env.ENVIRONMENT === 'development' ? 'src/app/models/*.ts' : 'dist/src/app/models/*.js'
  ],
  cli: {
    migrationsDir: process.env.ENVIRONMENT === 'development' ? 'src/database/migrations' : 'dist/src/app/migrations'
  }
}
