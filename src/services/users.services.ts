import { User } from "~/models/schemas/User.schema";
import databaseService from "./database.services";
import { RegisterReqBodyType } from "~/models/requests/User.requests";
import { hashPassword } from "~/utils/crypto";
import { signToken } from "~/utils/jwt";
import { TokenType } from "~/constants/enums";
class UsersService {
  // ----- Sign AccessToken -----
  private signAccessToken = (user_id: string) => {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
      },
    });
  };

  // ----- Sign RefreshToken -----
  private signRefreshToken = (user_id: string) => {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
      },
    });
  };

  // ----- Register -----
  register = async (payload: RegisterReqBodyType) => {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password),
      })
    );
    return result;
  };

  // ----- Check email exists -----
  checkEmailExists = async (email: string) => {
    const user = await databaseService.users.findOne({ email });
    return Boolean(user);
  };
}

const usersService = new UsersService();
export default usersService;
