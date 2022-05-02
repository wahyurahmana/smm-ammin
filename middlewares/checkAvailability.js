const {
    FreeOrder
} = require('../models')
const macaddress = require('macaddress');


//menghindari beda perangkat 1 akun
const checkUsername = function (req, res, next) {
    //validasinya belum sempurna
    FreeOrder.findOne({
            where: {
                link: req.body.link
            }
        })
        .then((linkUser) => {
            if (linkUser) { //jika linkUser nya ada
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


module.exports = {
    checkUsername,
    checkMac
}