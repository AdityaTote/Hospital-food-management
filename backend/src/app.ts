// app.ts
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
import { adminRouter } from "./routes/admin.routes";
import { pantryRouter } from "./routes/pantry.routes";


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;