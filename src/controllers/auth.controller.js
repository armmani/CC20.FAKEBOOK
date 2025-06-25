import prisma from "../config/prisma.config.js";
import checkIdentity from "../utils/check-identity.util.js";
import createError from "../utils/create-error.util.js";
import bcrypt from "bcryptjs";

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

    const result = await prisma.user.create({ data: newUser });

    res.json({
      msg: "Register Successful",
      result: result,
    });
  } catch (err) {
    next(err);
  }
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
  createError(403, "Block !!!");
  res.json({
    msg: "Get Me Controller",
    numUser,
  });
};
