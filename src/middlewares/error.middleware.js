export default function (err, req, res, next) {
  console.log(err.name);
  err.statusCode = 500;
  res.status(err.statusCode).json({
    errorMsg: err.message,
    errorName: err.name,
  });
};
