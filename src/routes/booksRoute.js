import { Router } from "express";
import { createBook, deleteBook, getBook, updateBook } from "../controllers/booksController.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";

const booksRouter = Router();

booksRouter.post("/", authorize("author"), createBook);

booksRouter.get("/:id", authorize("author", "reader"), getBook);

booksRouter.patch("/:id", authorize("author"), updateBook);

booksRouter.delete("/:id", authorize("author"), deleteBook);

export default booksRouter;