import jwt, { SignOptions } from "jsonwebtoken";

interface SignTokenType {
  payload: string | object | Buffer;
  privateKey?: string;
  options?: SignOptions;
}

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
