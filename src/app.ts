import express, { Application, json } from "express"
import "dotenv/config"
import { createUserController } from "./controllers/users.controllers"
import { error } from "./middlewares/handle.middleware";


const app: Application = express()
app.use(json())

app.use('/users', createUserController)

app.use(error)

export default app
