// Exports success() and error() helper functions that send consistent JSON responses in the format { success, message, data } across all API routes

const success = (res, data, message = "Success", statusCode = 200) => {
  const response = { success: true, message };

  if (Array.isArray(data)) {
    response.count = data.length;
    response.data = data;
  } else {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

// error() — call this when something went wrong
// Example: return error(res, "Notice not found.", 404)

const error = (res, message = "Server error", statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { success, error };
