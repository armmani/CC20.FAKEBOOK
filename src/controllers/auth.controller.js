import prisma from "../config/prisma.config.js";

export function register(req, res, next) {
  res.json({
    msg: "Register Controller",
    body: req.body,
  });
}

export const login = (req, res, next) => {
  res.json({
    msg: "Login Controller",
    body: req.body,
  });
};

export const getMe = async (req, res, next) => {
  let numUser = await prisma.user.count();
  console.log(numUser);
  res.json({
    msg: "Get Me Controller", numUser
  });
};
