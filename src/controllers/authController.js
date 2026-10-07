import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User Registration Successfully",
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
    });
  } catch (error) {
    console.error("User Registration Failed", error);

    return res.status(500).json({
      success: false,
      message: "User Registration Failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        userRole: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      },
    );

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json({
      success: true,
      message: "User Logged-in Successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("User Logged-in Failed", error);
    return res.status(500).json({
      success: false,
      message: "User Logged-in Failed",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json({
      success: true,
      message: "User Logged-out Successfully",
    });
  } catch (error) {
    console.error("User Logged-out Failed", error);
    return res.status(500).json({
      success: false,
      message: "User Logged-out Failed",
    });
  }
};
