import fs from "fs/promises";
import cloudinary from "../config/cloudinary.config.js";
import path from "path";
import prisma from "../config/prisma.config.js";

export const getAllPosts = async (req, res, next) => {
  res.json({ message: "Get All POSTs" });
};

export const createPost = async (req, res, next) => {
  const { message } = req.body;
  console.log(req.file);
  let haveFile = !!req.file;
  let uploadResult = null;

  console.log("cloudinary", cloudinary);
  if (haveFile) {
    uploadResult = await cloudinary.uploader.upload(req.file.path, {
      overwrite: true,
      public_id: path.parse(req.file.path).name,
    });
    fs.unlink(req.file.path);
  }
  const data = {
    message: message,
    image: uploadResult.secure_url,
    userId: req.user.id,
  };
  const rs = await prisma.post.create({ data });

  res.status(201).json({ message: "Create Post", result: rs });
};

export const updatePost = async (req, res, next) => {
  res.json({ message: "Update Post" });
};

export const deletePost = async (req, res, next) => {
  res.json({ message: "DELETE Post" });
};
