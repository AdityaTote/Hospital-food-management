import { prisma } from "../db";

export const handleAllMealPrep = async (req: any, res: any) => {
  try {
    const meal = await prisma.mealPreparation.findMany({
      select: {
        id: true,
        status: true,
        meal: {
          select: {
            id: true,
            name: true,
            ingredients: true,
            specialInstructions: true,
          },
        },
        deliveryId: {
          select: {
            id: true,
            status: true,
            deliveredAt: true,
            DeliveryPersonnel: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!meal) {
      return res.status(404).json({
        error: true,
        message: "No meal preparation found",
        data: null,
      });
    }

    return res.status(200).json({
      error: false,
      message: "All meal preparation",
      data: meal,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleMealPrepById = async (req: any, res: any) => {
  try {
    const id = req.params.id;

    const meal = await prisma.mealPreparation.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        status: true,
        meal: {
          select: {
            id: true,
            name: true,
            ingredients: true,
            specialInstructions: true,
          },
        },
        deliveryId: {
          select: {
            id: true,
            status: true,
            deliveredAt: true,
            DeliveryPersonnel: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!meal) {
      return res.status(404).json({
        error: true,
        message: "No meal preparation found",
        data: null,
      });
    }

    return res.status(200).json({
      error: false,
      message: "Meal preparation",
      data: meal,
    });
  } catch (error) {
    console.log(error);
  }
};
