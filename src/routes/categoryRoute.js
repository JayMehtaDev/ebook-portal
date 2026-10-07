import { Router } from "express";
import { createCategory, getCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.post("/", createCategory);

categoryRouter.get("/:id", getCategory);

categoryRouter.patch("/:id", updateCategory);

categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
