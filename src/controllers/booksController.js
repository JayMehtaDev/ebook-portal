import bookModel from "../models/bookModel.js";
import { getReviewsByBook } from "./reviewController.js";

export const createBook = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    const newBook = await bookModel.create({
      name,
      description,
      category,
      author: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: {
        book: {
          id: newBook._id,
          name: newBook.name,
          description: newBook.description,
          category: newBook.category,
          author: newBook.author,
        },
      },
    });
  } catch (error) {
    console.error("Book creation failed", error);

    return res.status(500).json({
      success: false,
      message: "Book creation failed",
    });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await bookModel
      .findById(id)
      .populate("category", "name description")
      .populate("author", "name email");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const reviews = await getReviewsByBook(id);

    return res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: {
        book,
        reviews,
      },
    });
  } catch (error) {
    console.error("Failed to fetch Book", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Book",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, status } = req.body;

    const book = await bookModel.findById(id);

    if (!book) {
      return res.status(401).json({
        success: false,
        message: "Book not found",
      });
    }

    if (status && status !== book.status) {
      if (status === "published") {
        book.publishedAt = new Date();
      }

      if (status === "draft") {
        book.publishedAt = null;
      }
    }

    book.name = name ?? book.name;
    book.description = description ?? book.description;
    book.category = category ?? book.category;
    book.status = status ?? book.status;

    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: {
        book,
      },
    });
  } catch (error) {
    console.error("Failed to update Book", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Book",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await bookModel.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete Book", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete Book",
    });
  }
};
