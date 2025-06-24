import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export default prisma;

// หรือใช้ export default new PrismaClient()
