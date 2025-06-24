import prisma from "../src/config/prisma.config.js";
import bcrypt from "bcryptjs";

const hashPassword = bcrypt.hashSync('123456', 10)
