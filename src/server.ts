import express from "express"
import colors from 'colors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUIOptions } from "./config/swagger"
import router from './router'
import db from "./config/db"

//Connect database
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.bgGreen.white('DB successfully connected'))
    } catch (error) {
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

//Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))


export default server