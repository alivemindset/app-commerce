import express from 'express'

import './database'
import routes from '../routes'

const app = express()

app.use(express.json())
app.use(routes)

console.log(process.env.DB_NAME)

export default app
