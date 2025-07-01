import express from "express";
import authRoute from "./routes/auth.route.js";
import notFoundMiddleware from "./middlewares/not-found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";
import postRoute from "./routes/post.route.js";
import authenticateMiddleware from "./middlewares/authenticate.middleware.js";
import likeRoute from "./routes/like.route.js";
import commentRoute from "./routes/comment.route.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/post",authenticateMiddleware, postRoute);
app.use("/api/comment", authenticateMiddleware, commentRoute);
app.use("/api/like", authenticateMiddleware, likeRoute);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
