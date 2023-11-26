import { User } from "~/models/schemas/User.schema";
import databaseService from "./database.services";
import { RegisterReqBodyType } from "~/models/requests/User.requests";
import { hashPassword } from "~/utils/crypto";
import { signToken } from "~/utils/jwt";
import { TokenType } from "~/constants/enums";
import { RefreshToken } from "~/models/schemas/RefreshToken.scheman";
import { ObjectId } from "mongodb";
import { config } from "dotenv";
import { USERS_MESSAGES } from "~/constants/messages";

config();
class UsersService {
  // ----- Check email exists -----
  checkEmailExists = async (email: string) => {
    const user = await databaseService.users.findOne({ email });
    return Boolean(user);
  };

  // ----- Sign AccessToken -----
  private signAccessToken = (user_id: string) => {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
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
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
      },
    });
  };

  // ----- Sign Access and Refress Token -----
  private signAccessAndRefreshToken = (user_id: string) => {
    return Promise.all([
      this.signAccessToken(user_id as string),
      this.signRefreshToken(user_id as string),
    ]);
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
    const user_id = result.insertedId?.toString();
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(
      user_id!
    );
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refreshToken })
    );
    return {
      accessToken,
      refreshToken,
    };
  };

  // ----- Login -----
  login = async (user_id: string) => {
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(
      user_id
    );
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refreshToken })
    );
    return {
      accessToken,
      refreshToken,
    };
  };

  // ----- Logout -----
  logout = async (refresh_token: string) => {
    await databaseService.refreshTokens.deleteOne({ token: refresh_token });
    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESS,
    };
  };
}

const usersService = new UsersService();
export default usersService;
