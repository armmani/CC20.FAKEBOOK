import express from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/register", register);
authRoute.get("/me", getMe);

export default authRoute;
