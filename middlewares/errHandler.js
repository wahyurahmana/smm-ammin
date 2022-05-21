const logErros = function (err, req, res, next) {
    let statusCode = err.status || 500
    let message = err.message
    if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
        statusCode = 400
        message = err.errors[0].message
    }

    if(err.name === 'MulterError'){
        statusCode = 400
        message = err.message
    }

    console.log(err);

    res.status(statusCode).json({status : false, message})
}

module.exports = logErros