import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectDb() {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
}
