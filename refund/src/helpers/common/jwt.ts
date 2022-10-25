import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import redisClient from "../common/redis";
// import { JWT_SECRET } from "../../config/stage";

class JWT {
  public createJSONWebToken = (userId: string, role: number, device_id: string, iat: number) => {
    try {
      const options = {
        expiresIn: "1y",
      };
      const token = jwt.sign({ userId, role, device_id, iat }, process.env.SECRET as string, options);
      return `JWT ${token}`;
    } catch (err) {
      console.log("error:", err);
    }
  };

  public decodeToken = (token: string) => {
    const payload = jwt.decode(token);
    return payload as { userId: string; role: number; device_id: string; iat: number };
  };

  public verify = (token: string) => {
    try {
      jwt.verify(token, process.env.SECRET || "");
      return true;
    } catch (error) {
      return false;
    }
  };
  public createJSONRefreshToken = (userId: string, role: number, device_id: string, iat: number) => {
    try {
      const options = {
        expiresIn: "1y",
        // audience:userId
      };
      const token = jwt.sign({ userId, role, device_id, iat }, process.env.REFRESHSECRET as string, options);
      redisClient.setRedisSting(`${userId}`, token, "EX", 365 * 24 * 60 * 60);
      return token;
    } catch (err) {
      throw err;
    }
  };
  public decodeRefreshToken = (token: string) => {
    const payload = jwt.decode(token);

    return payload as { userId: string; role: number; device_id: string; iat: number };
  };
  public verifyRefreshToken = (token: string) => {
    try {
      const data = jwt.verify(token, process.env.REFRESHSECRET || "");
      if (data) {
        const decodedData = this.decodeRefreshToken(token);
        return decodedData;
      }
    } catch (error) {
      return null;
    }
  };
}

const jwtHelper = new JWT();
export default jwtHelper;
