import express from "express";
import authRoute from "./routes/auth.route.js";
import notFoundMiddleware from "./middlewares/not-found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";
import postRoute from "./routes/post.route.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", (req, res) => res.send("comment Service"));
app.use("/api/like", (req, res) => res.send("like Service"));

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
