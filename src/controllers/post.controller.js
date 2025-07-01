import fs from "fs/promises";
import cloudinary from "../config/cloudinary.config.js";
import path from "path";
import prisma from "../config/prisma.config.js";
import createErrorUtil from "../utils/create-error.util.js";

export const getAllPosts = async (req, res, next) => {
  const resp = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
      comments: true,
      likes: true,
    },
  });
  res.json({ posts: resp });
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
    image: uploadResult?.secure_url || "",
    userId: req.user.id,
  };
  const rs = await prisma.post.create({ data });

  res.status(201).json({ message: "Create Post", result: rs });
};

export const updatePost = async (req, res, next) => {
  res.json({ message: "Update Post" });
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const foundPost = await prisma.post.findUnique({
    where: { id: +id },
  });
  if (!foundPost) {
    createErrorUtil(400, "POST ID NOT FOUND");
  }
  if (req.user.id !== foundPost.userId) {
    createErrorUtil(400, "Unable to delete");
  }
  const rs = await prisma.post.delete({
    where: { id: +id },
  });
  res.json({ message: "DELETE SUCCESSFUL" });
};
