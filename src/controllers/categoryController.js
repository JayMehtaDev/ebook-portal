import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCategory = await categoryModel.create({
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: {
        category: {
          id: newCategory._id,
          name: newCategory.name,
          description: newCategory.description,
        },
      },
    });
  } catch (error) {
    console.error("Category creation failed", error);

    return res.status(500).json({
      success: false,
      message: "Category creation failed",
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: {
        category: {
          id: category._id,
          name: category.name,
          description: category.description,
        },
      },
    });
  } catch (error) {
    console.error("Category fetched failed", error);

    return res.status(500).json({
      success: false,
      message: "Category fetched failed",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.name = name ?? category.name;
    category.description = description ?? category.description;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: {
        category: {
          id: category._id,
          name: category.name,
          description: category.description,
        },
      },
    });
  } catch (error) {
    console.error("Category update failed", error);

    return res.status(500).json({
      success: false,
      message: "Category update failed",
    });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Category delete failed", error);

    return res.status(500).json({
      success: false,
      message: "Category delete failed",
    });
  }
};
