import { Request, Response, Router } from "express";

import {
  accessTokenValidator,
  loginValidator,
  registerValidator,
} from "~/middlewares/users.middlewares";

import {
  loginController,
  registerController,
} from "~/controllers/users.controllers";

import { wrapRequestHandler } from "~/utils/wrap-handlers";

const usersRouter = Router();

// ----- Login -----

/*
Description: Login a user
Route: /users/login
Methods: POST
Body: {
  "email": "string",
  "password": "string",
}
*/
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

// ----- Logout -----
/*
Description: Logout a user
Route: /users/logout
Methods: POST
Headers: { Authorization: Bearer <access_token> }
Body: {refresh_token: string}
*/
usersRouter.post(
  "/logout",
  accessTokenValidator,
  wrapRequestHandler((req: Request, res: Response) => {
    res.json({ message: "Logout successfully!" });
  })
);

export default usersRouter;
