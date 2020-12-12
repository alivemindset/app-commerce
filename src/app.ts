import app from './config/server'
import './database'

app.listen(process.env.PORT || 3000)
