import { prisma } from "../db";

export const handleAllDiet = async (req: any, res: any) => {
  try {
    const diets = await prisma.dietChart.findMany({
      select: {
        id: true,
        mealType: true,
        Meal: {
          select: {
            id: true,
            name: true,
            ingredients: true,
            specialInstructions: true,
          },
        },
        patient: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!diets) {
      return res.status(404).json({
        error: true,
        message: "No diet found",
        data: null,
      });
    }

    return res.status(200).json({
      error: false,
      message: "All diet",
      data: diets,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleDietById = async (req: any, res: any) => {
  try {
    const id = req.params.id;

    const diet = await prisma.dietChart.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        mealType: true,
        Meal: {
          select: {
            id: true,
            name: true,
            ingredients: true,
            specialInstructions: true,
          },
        },
        patient: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!diet) {
      return res.status(404).json({
        error: true,
        message: "No diet found",
        data: null,
      });
    }

    return res.status(200).json({
      error: false,
      message: "Diet",
      data: diet,
    });
  } catch (error) {
    console.log(error);
  }
};
