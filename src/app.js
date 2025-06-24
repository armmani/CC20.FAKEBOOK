import express from "express";
import authRoute from './routes/auth.route.js'

const app = express();
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/post", (req, res) => {
  res.json({ body: req.body });
});
app.use("/api/comment", (req, res) => res.send("comment Service"));
app.use("/api/like", (req, res) => res.send("like Service"));

export default app;
