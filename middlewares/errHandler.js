const logErros = function (err, req, res, next) {
    let statusCode = err.status || 500
    res.status(statusCode).json(err)
}

module.exports = logErros