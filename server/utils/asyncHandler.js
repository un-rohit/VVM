// Wraps async controller functions to automatically catch errors and forward them to the global errorHandler via next() — removes the need for try/catch in every controller

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
