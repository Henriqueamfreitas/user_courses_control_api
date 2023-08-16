import { Router } from "express";
import "dotenv/config";
import { createUserController, getAllUsersController, getUserCoursesController 
} from "../controllers/users.controllers";
import { ensureNoEmailDuplicatesMiddleWare } from "../middlewares/verify.middleware";
import { validateBodyMiddleware, token } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/user.schema";
import { ensureTokenIsAdminMiddleWare } from "../middlewares/verify.middleware";

const usersRouter: Router = Router()

usersRouter.post('/', ensureNoEmailDuplicatesMiddleWare, validateBodyMiddleware(userCreateSchema), 
createUserController)

usersRouter.use(token)
usersRouter.get('/', ensureTokenIsAdminMiddleWare, getAllUsersController)
usersRouter.get('/:id/courses', ensureTokenIsAdminMiddleWare, getUserCoursesController)

export { usersRouter }