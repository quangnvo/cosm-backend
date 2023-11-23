import { Request, Response } from "express";
import { User } from "~/models/schemas/User.schema";
import databaseService from "~/services/database.services";
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
  res: Response
) => {
  try {
    const result = await usersService.register(req.body);

    return res.json({ message: "Register success", result });
  } catch (error) {
    return res.status(400).json({ message: "Register failed" });
  }
};
