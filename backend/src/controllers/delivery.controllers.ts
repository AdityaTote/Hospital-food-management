import { prisma } from "../db";

export const handleAllDelivery = async (req: any, res: any) => {
  try {
    const allDelivery = await prisma.delivery.findMany({
      select: {
        id: true,
        status: true,
        deliveryNotes: true,
        deliveredAt: true,
        meal: {
          select: {
            id: true,
            mealPreparations: {
              select: {
                id: true,
              },
            },
          },
        },
        DeliveryPersonnel: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!allDelivery) {
      return res.status(404).json({
        error: true,
        message: "No delivery found",
        data: null,
      });
    }

    return res.status(200).json({
      error: false,
      message: "All delivery",
      data: allDelivery,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleDelveryById = async (req: any, res: any) => {
    
    try {
        const id = req.params.id;
    
        const delivery = await prisma.delivery.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                status: true,
                deliveryNotes: true,
                deliveredAt: true,
                meal: {
                    select: {
                        id: true,
                        mealPreparations: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                DeliveryPersonnel: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
    
        if(!delivery){
            return res.status(404).json({
                error: true,
                message: "Delivery not found",
                data: null,
            });
        }
    
        return res.status(200).json({
            error: false,
            message: "Delivery",
            data: delivery,
        });
    } catch (error) {
        console.log(error);
    }
}