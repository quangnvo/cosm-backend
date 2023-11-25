import { Router } from "express";
import { loginValidator } from "~/middlewares/users.middlewares";
import {
  loginController,
  registerController,
} from "~/controllers/users.controllers";
import { registerValidator } from "~/middlewares/users.middlewares";
import { wrapRequestHandler } from "~/utils/wrap-handlers";

const usersRouter = Router();

// ----- Login -----
usersRouter.post("/login", loginValidator, wrapRequestHandler(loginController));

// ----- Register -----
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

usersRouter.post(
  "/register",
  registerValidator,
  wrapRequestHandler(registerController)
);

export default usersRouter;
