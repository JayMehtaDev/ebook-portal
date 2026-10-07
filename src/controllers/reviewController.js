import reviewModel from "../models/reviewModel.js";

export const createReview = async (req, res) => {
  try {
    const { book_id, comment, rating } = req.body;

    const newReview = await reviewModel.create({
      book: book_id,
      user: req.user.userId,
      comment,
      rating,
    });

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: {
        review: {
          id: newReview._id,
          comment: newReview.comment,
          rating: newReview.rating,
        },
      },
    });
  } catch (error) {
    console.error("Review creation failed", error);

    return res.status(500).json({
      success: false,
      message: "Review creation failed",
    });
  }
};

export const getReviewsByBook = async (id) => {
  try {
    const reviews = await reviewModel
      .find({ book: id })
      .populate("user", "name email")
      .select("comment rating user createdAt")
      .sort({ createdAt: -1 });

      return reviews;
  } catch (error) {
    console.error("Failed to fetch reviews", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};
