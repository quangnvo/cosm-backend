import { JwtPayload } from "jsonwebtoken";
import { TokenType } from "~/constants/enums";

export interface RegisterReqBodyType {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
  date_of_birth: string;
}

export interface TokenPayload extends JwtPayload {
  user_id: string;
  token_type: TokenType;
}
