require('dotenv').config({
  path: process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'test' ? '.env.testing' : '.env.dev'
})

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
    './src/database/migrations/*.ts'
  ],
  entities: [
    './src/app/models/*.ts'
  ],
  cli: {
    migrationsDir: './src/database/migrations'
  }
}
