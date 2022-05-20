const {
    FreeOrder,LimitTrxFree
} = require('../models')
const macaddress = require('macaddress');


//menghindari beda perangkat 1 akun
const checkUsername = function (req, res, next) {
    //validasinya belum sempurna
    FreeOrder.findOne({
            where: {
                target: req.body.target
            }
        })
        .then((targetUser) => {
            if (targetUser) { //jika targetUser nya ada
                throw { status: 401, message: 'your account is limited, please try again in the next 7 days ' }
            } else {
                next()
            }
        }).catch((err) => {
            next(err)
        });
}

//menghindari beda akun 1 perangkat
const checkMac = (req, res, next) => {
    macaddress.one()
        .then((mac) => {
            FreeOrder.findOne({
                    where: {
                        mac_address: mac
                    }
                })
                .then((mac) => {
                    if (mac) { //jika mac nya ada
                        throw { status: 401, message: 'your account is limited, please try again in the next 7 days ' }
                    } else {
                        next()
                    }
                }).catch((err) => {
                    next(err)
                });
        }).catch((err) => {
            next({status : 400, message : "Mac Address inValid"})
        });
}

//cek ketersedian limit harian
const checkLimitTrx = (req, res, next) =>{
    LimitTrxFree.findByPk(1)
    .then((result) => {
        if (result.qty <= 0) {
            next({status : 401, message : "Daily transaction limit is up"})
        } else {
            next()
        }
    }).catch((err) => {
        next({status : 400, message : "Limit Trx Not Found"})
    });
}

module.exports = {
    checkUsername,
    checkMac,
    checkLimitTrx
}