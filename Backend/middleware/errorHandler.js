exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found Invalid - ${req.originalUrl}`)
  res.statusCode = 404
  next(error)
}

exports.errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message
  res.status(statusCode).json({
    message,
  })
}
