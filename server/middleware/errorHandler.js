// Global error handler — catches all errors passed via next(err),--
// translates Mongoose and JWT errors into clean JSON responses with the correct HTTP status code

const errorHandler = (err, req, res, next) => {
  //start the default
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose: bad ID format — e.g., /api/notices/not-an-id
  // Mongoose tries to cast "not-an-id" to MongoDB ObjectId and fails
  if (err.name === "CastError" && err.kind === "ObjectId") {
    ((statusCode = 400), (message = "Record Not Found - Invalid ID format."));
  }
  // Mongoose: duplicate key — e.g., creating admin with username that exists
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    statusCode = 400;
    message = `Record already exists  ${field} already exists.`;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(",");
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid Token. Please log in again";
  }
  // JWT: token has expired (7-day session ended)
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Session expired. Please log in again";
  }
  //Muller: file too large
  if (err.name === "LIMIT_FILE_SIZE") {
    ((statusCode = 400),
      (message = "File is too large. Max is 4MB for images and 2MB for PDFs."));
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
