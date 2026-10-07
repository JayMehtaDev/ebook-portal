import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const verifyToken = jwt.verify(accessToken, process.env.JWT_SECRET);

    req.user = verifyToken;

    next();
  } catch (error) {
    console.error("Authentication required", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
