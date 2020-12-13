import app from './config/server'

app.listen(process.env.PORT || 3000, () => console.log(`Server is running in http://127.0.0.1:${process.env.PORT || 3000}`))
