import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import CategoryRoute from "./routes/CategoryRoute.js";
import BooksRoute from "./routes/BooksRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(CategoryRoute);
app.use(BooksRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server running");
});
