import jwt from "jsonwebtoken";
import { HospitalFoodAdminTypes } from "../types/types";

export const signToken = (user: HospitalFoodAdminTypes, jwtSecreteKey: string): string => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, jwtSecreteKey);

  return token;
};

export const verifyToken = (token: string, jwtSecreteKey: string): any => {
  const tokenData = jwt.verify(token, jwtSecreteKey);

  return tokenData;
};