import { Router } from "express";
import { handleAdminLogin, handleAdminRegister } from "../controllers/admin.controllers";
import { checkAdminToken } from "../middlewares/checkAdminToken.middlewar";

export const adminRouter = Router();

adminRouter
  .post("/register", handleAdminRegister)
  .post("/login", handleAdminLogin);

adminRouter.use(checkAdminToken);