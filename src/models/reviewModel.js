import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    comment: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
);

reviewSchema.index({
  book: 1,
  createdAt: -1,
})

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
