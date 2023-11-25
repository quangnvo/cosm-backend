import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "dotenv";

config();

interface SignTokenType {
  payload: string | object | Buffer;
  privateKey?: string;
  options?: SignOptions;
}

// ----- Sign Token -----
export const signToken = ({
  payload,
  privateKey = process.env.JWT_PRIVATE_KEY as string,
  options = { algorithm: "HS256" },
}: SignTokenType) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        throw reject(err);
      }
      resolve(token as string);
    });
  });
};

// ----- Verify Token -----
export const verifyToken = ({
  token,
  secretOrPublicKey = process.env.JWT_SECRET as string,
}: {
  token: string;
  secretOrPublicKey?: string;
}) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (err, decoded) => {
      if (err) {
        throw reject(err);
      }
      resolve(decoded as jwt.JwtPayload);
    });
  });
};
