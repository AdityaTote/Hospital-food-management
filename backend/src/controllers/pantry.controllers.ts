import { z } from "zod";
import { prisma } from "../db";
import { hashPass, verifyPass } from "../utils/password";
import { signToken } from "../utils/jwt";
import { pantryStaffJwtSecret } from "../constant";

const pantrySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const deliveryStaffSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const assignDeliveryStaffSchema = z.object({
  status: z.enum(["pending", "delivered", "failed"]),
  deliveryNotes: z.string().optional(),
  mealId: z.string(),
  patientId: z.string(),
  deliveryPersonnelId: z.string(),
  deliveredAt: z.date(),
});

export const handlePantryStaffLogin = async (req: any, res: any) => {
  try {
    const pantryData = pantrySchema.safeParse(req.body);

    if (!pantryData.success) {
      return res.status(400).json({ error: pantryData.error });
    }

    const { email, password } = pantryData.data;

    const adminExist = await prisma.pantryStaff.findFirst({
      where: {
        email: email,
      },
    });

    if (!adminExist) {
      return res.status(400).json({ error: "Admin does not exist" });
    }

    if (!adminExist.password) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    const passCheck = await verifyPass(password, adminExist.password);

    if (!passCheck) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    const token = signToken(adminExist, pantryStaffJwtSecret);

    return res
      .status(200)
      .cookie("foodAdminToken", token, {
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

  return res.clearCookie("staffSessionId").json({
    message: "Admin logged out successfully",
  });
};

export const handleDeliveryStaffCreation = async (req: any, res: any) => {
  try {
    const pantry = req.staff;

    const deliveryStaffSchemaData = deliveryStaffSchema.safeParse(req.body);

    if (!deliveryStaffSchemaData.success) {
      return res.status(400).json({
        error: true,
        message: deliveryStaffSchemaData.error,
        data: null,
      });
    }

    const { name, email, password, phone } = deliveryStaffSchemaData.data;

    const hashedPass = await hashPass(password);

    if (!hashedPass) {
      return res.status(500).json({
        error: true,
        message: "Error in pass hassing",
        data: null,
      });
    }

    const pantryStaff = await prisma.deliveryPersonnel.create({
      data: {
        name,
        phone,
        email,
        password: hashedPass,
        pantryId: pantry.id,
      },
    });

    if (!pantryStaff) {
      return res.status(500).json({
        error: true,
        message: "Delivery Staff creation failed",
        data: null,
      });
    }

    return res.status(201).json({
      error: false,
      message: "Delivery Staff created successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleAssignDeliveryStaff = async (req: any, res: any) => {
  try {
    const pantry = req.staff;

    const assignDeliveryStaffSchemaData = assignDeliveryStaffSchema.safeParse(
      req.body
    );

    if (!assignDeliveryStaffSchemaData.success) {
      return res.status(400).json({
        error: true,
        message: assignDeliveryStaffSchemaData.error,
        data: null,
      });
    }

    const { status, deliveryNotes, mealId, patientId, deliveryPersonnelId } =
      assignDeliveryStaffSchemaData.data;

    const meal = await prisma.meal.findFirst({
      where: {
        id: mealId,
      },
      select: {
        id: true,
        mealPreparations: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!meal?.mealPreparations?.id) {
      return res.status(400).json({
        error: true,
        message: "Meal not found",
        data: null,
      });
    }

    const deliveryStaff = await prisma.deliveryPersonnel.findFirst({
      where: {
        id: deliveryPersonnelId,
      },
      select:{
        id: true
      }
    });

    if (!deliveryStaff) {
      return res.status(400).json({
        error: true,
        message: "Delivery staff not found",
        data: null,
      });
    }

    const patient = await prisma.patient.findFirst({
      where: {
        id: patientId,
      },
      select: {
        id: true,
      }
    });

    if (!patient) {
      return res.status(400).json({
        error: true,
        message: "Patient not found",
        data: null,
      });
    }

    const assignDeliveryStaff = await prisma.delivery.create({
      data: {
        status: status,
        deliveryNotes: deliveryNotes,
        mealId: meal.id,
        patientId: patient.id,
        deliveryPersonnelId: deliveryStaff.id,
        deliveredAt: new Date(),
        mealPreparationId: meal.mealPreparations.id,
        pantryId: pantry.id,
      },
    });

    if (!assignDeliveryStaff) {
      return res.status(500).json({
        error: true,
        message: "Delivery assignment failed",
        data: null,
      });
    }

    return res.status(201).json({
      error: false,
      message: "Delivery assigned successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
};