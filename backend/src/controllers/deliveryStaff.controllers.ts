import { z } from "zod";
import { prisma } from "../db";
import { verifyPass } from "../utils/password";
import { signToken } from "../utils/jwt";
import { deliveryJwtSecret } from "../constant";

const deliveryStaffSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const handlePantryStaffLogin = async (req: any, res: any) => {
  try {
    const deliveryStaffData = deliveryStaffSchema.safeParse(req.body);

    if (!deliveryStaffData.success) {
      return res.status(400).json({ error: deliveryStaffData.error });
    }

    const { email, password } = deliveryStaffData.data;

    const deliveryStaffExist = await prisma.deliveryPersonnel.findFirst({
      where: {
        email: email,
      },
    });

    if (!deliveryStaffExist) {
      return res.status(400).json({ error: "Admin does not exist" });
    }

    if (!deliveryStaffExist.password) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    const passCheck = await verifyPass(password, deliveryStaffExist.password);

    if (!passCheck) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    const token = signToken(deliveryStaffExist, deliveryJwtSecret);

    return res
      .status(200)
      .cookie("deliveryToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "Admin logged in successfully",
      });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handlePantryStaffLogout = async (req: any, res: any) => {
  const admin = req.staff;

  if (!admin) {
    return res.status(400).json({ error: "Admin not found" });
  }

  return res.clearCookie("deliverySessionId").json({
    message: "Admin logged out successfully",
  });
};