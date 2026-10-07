import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoute.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import booksRouter from "./routes/booksRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import reviewRouter from "./routes/reviewRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.json({
    message: "Welcome to eBook Portal API",
    user: req.user,
  });
});

app.use("/api/auth", authRouter);
app.use("/api/books", authMiddleware, booksRouter)
app.use("/api/categories", authMiddleware, categoryRouter)
app.use("/api/reviews", authMiddleware, reviewRouter)

export default app;
