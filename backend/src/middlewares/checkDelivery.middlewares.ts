import { verifyToken } from "../utils/jwt";
import { hospitalFoodAdminJwtSecret } from "../constant";

export const checkPantryToken = (req: any, res: any, next: any) => {
  const token = req.cookies?.deliverySessionId;

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const decode = verifyToken(token, hospitalFoodAdminJwtSecret);

  if (!decode) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  req.delStaff = decode;

  next();
};
