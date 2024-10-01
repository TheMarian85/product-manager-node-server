import express from "express"
import colors from 'colors'
import router from './router'
import db from "./config/db"

//Connect database
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.bgGreen.white('DB successfully connected'))
    } catch (error) {
        console.log(error)
        console.log(colors.bgRed.white('Error connecting DB'))
    }
}
connectDB()

//Instancia de express
const server = express()

//Leer datos de formulario
server.use(express.json())

//Routing
server.use('/api/products', router)

export default server