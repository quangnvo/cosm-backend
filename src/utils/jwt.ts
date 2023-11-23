import jwt from "jsonwebtoken";

interface SignTokenType {
  payload: any;
  privateKey?: string;
  options: jwt.SignOptions;
}

export const signToken = ({
  payload,
  privateKey = process.env.JWT_PRIVATE_KEY as string,
  options,
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
