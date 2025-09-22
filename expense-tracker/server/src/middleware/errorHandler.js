/**
 * Centralised error handler for Express.
 * Ensures consistent error responses and avoids duplicated try/catch.
 */
export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
      status,
    },
  });
}
