import prisma from "../config/prisma.config.js";
import createErrorUtil from "../utils/create-error.util.js";

export async function createComment(req, res, next) {
  const { message, postId } = req.body;
  const userId = req.user.id;

  const postData = await prisma.post.findUnique({ where: { id: postId } });
  if (!postData) {
     createErrorUtil(401, "Cannot Create Comment")
  }

  const rs = await prisma.comment.create({
    data: { message, postId, userId },
  });
  res.json(rs);
}
