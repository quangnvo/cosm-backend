import { NextFunction, Request, Response } from "express";
import usersService from "~/services/users.services";
import { ParamsDictionary } from "express-serve-static-core";
import { RegisterReqBodyType } from "~/models/requests/User.requests";
import { ObjectId } from "mongodb";
import { User } from "~/models/schemas/User.schema";
import { USERS_MESSAGES } from "~/constants/messages";

// ----- Login controller -----
export const loginController = async (req: Request, res: Response) => {
  const { user }: any = req;
  const user_id = user._id;
  const result = await usersService.login(user_id.toString());
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result,
  });
};

// ----- Register controller -----
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBodyType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await usersService.register(req.body);
    return res.json({
      message: USERS_MESSAGES.REGISTER_SUCCESS,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// ----- Logout controller -----
export const logoutController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const result = await usersService.logout(refreshToken);
  return res.json(result);
};
