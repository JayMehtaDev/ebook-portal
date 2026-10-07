import { Router } from "express";
import { createReview } from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter.post("/", createReview);

export default reviewRouter;