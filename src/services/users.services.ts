import { User } from "~/models/schemas/User.schema";
import databaseService from "./database.services";

class UsersService {
  register = async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    const result = await databaseService.users.insertOne(
      new User({
        email,
        password,
      })
    );
    return result;
  };

  checkEmailExists = async (email: string) => {
    const user = await databaseService.users.findOne({ email });
    return Boolean(user);
  };
}

const usersService = new UsersService();
export default usersService;
