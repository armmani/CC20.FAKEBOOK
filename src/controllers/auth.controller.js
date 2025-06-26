import prisma from "../config/prisma.config.js";
import { createUser, getUserBy } from "../services/user.service.js";
import checkIdentity from "../utils/check-identity.util.js";
import createError from "../utils/create-error.util.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  try {
    const { identity, firstName, lastName, password, confirmPassword } =
      req.body;
    //validation

    if (
      !(
        identity.trim() &&
        firstName.trim() &&
        lastName.trim() &&
        password.trim() &&
        confirmPassword.trim()
      )
    ) {
      createError(400, "Enter All Information");
    }
    if (password !== confirmPassword) {
      createError(400, "Password is not MATCHED");
    }
    // identity >> email || mobile phone number : checkIdentity(identity) => String : 'email' || 'mobile'
    const identityKey = checkIdentity(identity);

    // หา user
    const foundUser = await prisma.user.findUnique({
      where: { [identityKey]: identity },
    });
    if (foundUser) {
      createError(409, "This user is already existed");
    }

    const newUser = {
      [identityKey]: identity,
      password: await bcrypt.hash(password, 10),
      firstName: firstName,
      lastName: lastName,
    };

    // const result = await prisma.user.create({ data: newUser });

    res.json({
      msg: "Register Successful",
      result: newUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function registerYup(req, res, next) {
  console.log(req.body);

  try {
    const { email, mobile, firstName, lastName, password } = req.body;
    // finding user
    if (email) {
      let foundUserEmail = await getUserBy("email", email);
      if (foundUserEmail) createError(409, `${email} already existed`);
    }
    if (mobile) {
      let foundUserMobile = await getUserBy("mobile", mobile);
      if (foundUserMobile) createError(409, `${mobile} already existed`);
    }
    const newUser = {
      email,
      mobile,
      password: await bcrypt.hash(password, 10),
      firstName,
      lastName,
    };
    // const result = await prisma.user.create({ data: newUser }); สร้าง user.service.js แล้ว ทำแทน
    const result = await createUser(newUser);

    res.json({ msg: "RegisterYup Successful", result });
  } catch (err) {
    next(err);
  }
}

export const login = async (req, res, next) => {
  const { identity, password, email, mobile } = req.body;
  const identityKey = email ? "email" : "mobile";

  // const foundUser = await prisma.user.findUnique({
  //   where: { [identityKey]: identity },
  // });

  const foundUser = await getUserBy(identityKey, identity);
  if (!foundUser) {
    createError(401, "Cannot Login");
  }
  let pwdOk = await bcrypt.compare(password, foundUser.password);
  if (!pwdOk) {
    createError(401, "Cannot Login");
  }
  // Create Web Token
  const payload = { id: foundUser.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "15d",
  });

  res.json({
    msg: "Login Successful",
    token: token,
  });
};

export const getMe = async (req, res, next) => {
  let numUser = await prisma.user.count();
  console.log(numUser);
  createError(403, "Block !!!");
  res.json({
    msg: "Get Me Controller",
    numUser,
  });
};
