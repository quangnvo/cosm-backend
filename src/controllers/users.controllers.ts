import { Request, Response } from "express";
import { User } from "~/models/schemas/User.schema";
import databaseService from "~/services/database.services";

// Login controller
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.json({ message: "Login success" });
};

// Register controller
export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await databaseService.users.insertOne(
      new User({
        email,
        password,
      })
    );
    console.log("result nè: ", result);

    return res.json({ message: "Register success" });
  } catch (error) {
    return res.status(400).json({ message: "Register failed" });
  }
};
