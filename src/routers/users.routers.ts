import { Router } from "express";
import "dotenv/config";
import { createUserController, getAllUsersController } from "../controllers/users.controllers";
import { ensureNoEmailDuplicatesMiddleWare } from "../middlewares/verify.middleware";
import { validateBodyMiddleware, token } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/user.schema";

const usersRouter: Router = Router()

usersRouter.post('/', ensureNoEmailDuplicatesMiddleWare, validateBodyMiddleware(userCreateSchema), 
createUserController)

usersRouter.use(token)
usersRouter.get('/', getAllUsersController)

export { usersRouter }