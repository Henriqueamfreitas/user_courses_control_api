import express, { Application, json } from "express"
import "dotenv/config"
import { error } from "./middlewares/handle.middleware";
import { usersRouter } from "./routers/users.routers";
import { coursesRouter } from "./routers/courses.routers";


const app: Application = express()
app.use(json())

app.use('/users', usersRouter)
app.use('/courses', coursesRouter)

app.use(error)

export default app
