export const getAllPosts = async (req, res, next) => {
  res.json({ message: "Get All POSTs" });
};

export const createPost = async (req, res, next) => {
  console.log(req.body.message)
  console.log(req.file)
  res.json({ message: "Create Post", file: req.file });
};

export const updatePost = async (req, res, next) => {
  res.json({ message: "Update Post" });
};

export const deletePost = async (req, res, next) => {
  res.json({ message: "DELETE Post" });
};
