import { verify, sign } from "jsonwebtoken";
import config from "../../config/config";
import UserType from "@MyTypes/user.type";
export interface ITokenPayload {
  user?: {
    _id: string;
    check: boolean;
  };
  auth?: UserType;
  verify?: {
    code: string;
    lastSendTime: Date;
  };
}
function verifyToken(
  token: string,
  {
    secret = config.JWT_SECRET,
  }: {
    secret?: string;
  } = {}
) {
  return verify(token, secret) as ITokenPayload;
}

function signToken(
  payload: ITokenPayload,
  {
    secret = config.JWT_SECRET,
    expiresIn = config.JWT_EXPIRES_IN,
  }: {
    secret?: string;
    expiresIn?: string;
  } = {}
) {
  return sign(payload, secret, {
    expiresIn: expiresIn,
  });
}

export { verifyToken, signToken };
