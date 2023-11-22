import { Router } from "express";
import { loginValidator } from "~/middlewares/users.middlewares";
import {
  loginController,
  registerController,
} from "~/controllers/users.controllers";
import { registerValidator } from "~/middlewares/users.middlewares";

const usersRouter = Router();

usersRouter.post("/login", loginValidator, loginController);

/* 
Description: Register a new user
Route: /users/register
Methods: POST
Body: {
  "name": "string",
  "email": "string",
  "password": "string",
  "password_confirm": "string",
  "date_of_birth": "string",
}
*/

usersRouter.post("/register", registerValidator, registerController);

export default usersRouter;
