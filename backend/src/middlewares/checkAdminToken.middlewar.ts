import { verifyToken } from "../utils/jwt";
import { hospitalFoodAdminJwtSecret } from "../constant";

export const checkAdminToken = (req: any, res: any, next: any) => {
  const token = req.cookies?.adminSessionId;

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

  req.admin = decode;

  next();
};