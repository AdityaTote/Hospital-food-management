import { config } from "dotenv";

config();

export const port = process.env.PORT || 4000;
export const hospitalFoodAdminJwtSecret = process.env.HOSTPITAL_FOOD_ADMIN_JWT_SECRET || "hospital's food admin secret";
export const pantryStaffJwtSecret = process.env.PANTRY_STAFF_JWT_SECRET || "pantry staff secret";
export const deliveryJwtSecret = process.env.DELIVERY_JWT_SECRET || "delivery secret";
export const saltRound = parseInt(process.env.SALT_ROUNDS || "12");