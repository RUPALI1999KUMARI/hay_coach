/* Error handler middleware code here */

// Error handling middleware
export function errorHandlerMiddleware(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}
