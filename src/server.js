import app from "./app.js";
import connectDB from "./config/db.js";

const app_url = process.env.APP_URL;
const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    if (!app_url || !port) {
        throw new Error('APP_URL or PORT is not defined')
    }
    app.listen(port, () => {
      console.log(`Server running on ${app_url}:${port}`);
    });

    connectDB();
  } catch (error) {
    console.error("Failed to start application", error);

    process.exit(1);
  }
};

startServer();
