import { Router } from "express";
import {
  handlePantryStaffLogin,
  handlePantryStaffLogout,
} from "../controllers/pantry.controllers";
import { checkPantryToken } from "../middlewares/checkPantryToken.middleware";

export const pantryRouter = Router();

pantryRouter.post("/login", handlePantryStaffLogin);

pantryRouter.use(checkPantryToken)
pantryRouter.post("/logout", handlePantryStaffLogout);
