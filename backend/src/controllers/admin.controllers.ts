import { z } from "zod";
import { prisma } from "../db";
import { hashPass, verifyPass } from "../utils/password";
import { signToken } from "../utils/jwt";
import { hospitalFoodAdminJwtSecret } from "../constant";

const adminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const pantrySchema = z.object({
  name: z.string(),
  contactInfo: z.string(),
  location: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const patientSchema = z.object({
  name: z.string(),
  disease: z.string(),
  allergy: z.string(),
  roomNo: z.string(),
  bedNo: z.string(),
  floorNo: z.string(),
  age: z.number(),
  gender: z.enum(["male", "female"]),
  phone: z.string(),
  emergency: z.string().optional(),
  address: z.string(),
});

const mealSchema = z.object({
  name: z.string(),
  ingredients: z.string(),
  specialInstructions: z.string().optional(),
});

const dietSchema = z.object({
  time: z.enum(["morning", "noon", "night"]),
  mealId: z.string(),
  patientId: z.string(),
});

const assignMealPreaprationTaskSchema = z.object({
  preparationStatus: z.enum(["pending", "inprogress", "completed"]),
  pantryId: z.string(),
  mealId: z.string(),
});

export async function handleAdminRegister(req: any, res: any) {
  try {
    const adminData = adminSchema.safeParse(req.body);

    if (!adminData.success) {
      return res.status(400).json({
        error: true,
        message: adminData.error,
        data: null,
      });
    }

    const { email, password } = adminData.data;

    const adminExist = await prisma.hospitalFoodAdmin.findFirst({
      where: {
        email: email,
      },
    });

    if (adminExist) {
      return res.status(400).json({
        error: true,
        message: "Admin already exists",
        data: null,
      });
    }

    const hashedPass = await hashPass(password);

    if (!hashedPass) {
      return res.status(500).json({
        error: true,
        message: "Error in pass hassing",
        data: null,
      });
    }

    const admin = await prisma.hospitalFoodAdmin.create({
      data: {
        email: email,
        password: hashedPass,
      },
    });

    if (!admin) {
      return res
        .status(500)
        .json({ error: true, message: "User creation failed", data: null });
    }

    const token = signToken(admin, hospitalFoodAdminJwtSecret);

    if (!token) {
      return res
        .status(500)
        .json({ error: true, message: "Error in token creation", data: null });
    }

    return res.status(201).cookie("foodAdminToken", token).json({
      error: false,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

export const handleAdminLogin = async (req: any, res: any) => {
  try {
    const adminData = adminSchema.safeParse(req.body);

    if (!adminData.success) {
      return res.status(400).json({
        error: true,
        message: adminData.error,
        data: null,
      });
    }

    const { email, password } = adminData.data;

    const adminExist = await prisma.hospitalFoodAdmin.findFirst({
      where: {
        email: email,
      },
    });

    if (!adminExist) {
      return res.status(400).json({
        error: true,
        message: "Admin does not exists",
        data: null,
      });
    }

    if (!adminExist.password) {
      return res.status(404).json({
        error: false,
        message: "Admin password not found",
        data: null,
      });
    }
    const passCheck = await verifyPass(password, adminExist.password);

    if (!passCheck) {
      return res.status(404).json({
        error: true,
        message: "Password does not match",
        data: null,
      });
    }

    const token = signToken(adminExist, hospitalFoodAdminJwtSecret);

    return res.status(204).cookie("foodAdminToken", token).json({
      error: false,
      message: "Admin logged in successfully",
      data: null,
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const handleAdminLogout = async (req: any, res: any) => {
  const admin = req.admin;

  if (!admin) {
    return res.status(400).json({
      error: true,
      message: "Admin not found",
      data: null,
    });
  }

  return res.clearCookie("adminSessionId").json({
    error: false,
    message: "Admin logged out successfully",
    data: null,
  });
};

export const handlePantryStaffCreation = async (req: any, res: any) => {
  try {
    const admin = req.admin;

    const pantryData = pantrySchema.safeParse(req.body);

    if (!pantryData.success) {
      return res.status(400).json({
        error: true,
        message: pantryData.error,
        data: null,
      });
    }

    const { name, contactInfo, email, location, password } = pantryData.data;

    const hashedPass = await hashPass(password);

    if (!hashedPass) {
      return res.status(500).json({
        error: true,
        message: "Error in pass hassing",
        data: null,
      });
    }

    const pantryStaff = await prisma.pantryStaff.create({
      data: {
        name,
        contactInfo,
        email,
        location,
        password: hashedPass,
        adminId: admin.id,
      },
    });

    if (!pantryStaff) {
      return res.status(500).json({
        error: true,
        message: "pantryStaff creation failed",
        data: null,
      });
    }

    return res.status(201).json({
      error: false,
      message: "pantryStaff created successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handlePatientCreation = async (req: any, res: any) => {
  try {
    const admin = req.admin;

    const patientData = patientSchema.safeParse(req.body);

    if (!patientData.success) {
      return res.status(400).json({
        error: true,
        message: patientData.error,
        data: null,
      });
    }

    const {
      name,
      disease,
      allergy,
      roomNo,
      bedNo,
      floorNo,
      age,
      gender,
      phone,
      emergency,
      address,
    } = patientData.data;

    const patient = await prisma.patient.create({
      data: {
        name,
        disease,
        allergy,
        roomNo,
        bedNo,
        floorNo,
        age,
        gender,
        phone,
        emergency,
        address,
        adminId: admin.id,
      },
    });

    if (!patient) {
      return res.status(500).json({
        error: true,
        message: "Patient creation failed",
        data: null,
      });
    }

    return res.status(201).json({
      error: false,
      message: "Patient created successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleMealCreation = async (req: any, res: any) => {
  try {
    const admin = req.admin;

    const mealData = mealSchema.safeParse(req.body);

    if (!mealData.success) {
      return res.status(400).json({
        error: true,
        message: mealData.error,
        data: null,
      });
    }

    const { name, ingredients, specialInstructions } = mealData.data;

    const meal = await prisma.meal.create({
      data: {
        name,
        ingredients,
        specialInstructions,
        hospitalFoodAdminId: admin.id,
      },
    });

    if (!meal) {
      return res.status(500).json({
        error: true,
        message: "Meal creation failed",
        data: null,
      });
    }

    return res.status(201).json({
      error: false,
      message: "Meal created successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleDietCreation = async (req: any, res: any) => {
  try {
    const admin = req.admin;

    const dietData = dietSchema.safeParse(req.body);

    if (!dietData.success) {
      return res.status(400).json({
        error: true,
        message: dietData.error,
        data: null,
      });
    }

    const { time, mealId, patientId } = dietData.data;

    const diet = await prisma.dietChart.create({
      data: {
        mealType: time,
        Meal: {
          connect: {
            id: mealId,
          },
        },
        patientId: patientId,
        adminId: admin.id,
      },
    });

    if (!diet) {
      return res.status(500).json({
        error: true,
        message: "Diet creation failed",
        data: null,
      });
    }

    return res.status(201).json({
      error: false,
      message: "Diet created successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleAssignMealPreaprationTask = async (req: any, res: any) => {
  try {
    const admin = req.admin;

    const taskData = assignMealPreaprationTaskSchema.safeParse(req.body);

    if (!taskData.success) {
      return res.status(400).json({
        error: true,
        message: taskData.error,
        data: null,
      });
    }

    const { preparationStatus, pantryId, mealId } = taskData.data;

    const pantry = await prisma.pantryStaff.findFirst({
      where: {
        id: pantryId,
      },
      select: {
        id: true,
      }
    });

    if(!pantry?.id){
      return res.status(400).json({
        error: true,
        message: "Pantry Staff not found",
        data: null,
      });
    }

    const task = await prisma.mealPreparation.create({
      data: {
        status: preparationStatus,
        pantryId: pantry.id,
        mealId: mealId,
        adminId: admin.id,
      },
    });

    if (!task) {
      return res.status(500).json({
        error: true,
        message: "Task creation failed",
        data: null,
      });
    }

    return res.status(201).json({
      error: false,
      message: "Task created successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
};