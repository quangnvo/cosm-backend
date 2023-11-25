import { Request } from "express";
import { User } from "./models/schemas/User.schema";
declare module "expres" {
  interface Request {
    user?: User;
  }
}
