import { NextFunction, Request, Response } from "express";
import usersService from "~/services/users.services";
import { ParamsDictionary } from "express-serve-static-core";
import { RegisterReqBodyType } from "~/models/requests/User.requests";

// Login controller
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.json({ message: "Login success" });
};

// Register controller
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBodyType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await usersService.register(req.body);

    return res.json({ message: "Register success", result });
  } catch (error) {
    next(error);
  }
};
