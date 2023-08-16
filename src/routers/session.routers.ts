import { Router } from "express";
import "dotenv/config";
import { loginController } from "../controllers/session.controllers";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { userLoginSchema } from "../schemas/user.schema";

const loginRouter: Router = Router()


loginRouter.post('/', validateBodyMiddleware(userLoginSchema), loginController)

export { loginRouter }