import { Router } from "express";
import "dotenv/config";
import { createUserController } from "../controllers/users.controllers";
import { ensureNoEmailDuplicatesMiddleWare } from "../middlewares/verify.middleware";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/user.schema";

const usersRouter: Router = Router()

usersRouter.post('/', ensureNoEmailDuplicatesMiddleWare, validateBodyMiddleware(userCreateSchema), 
createUserController)

export { usersRouter }