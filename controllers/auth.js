const {User} = require('../models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
class Controller {
  static async register(req, res, next){
    try {
      const data = {
        email : req.body.email,
        password : req.body.password,
        photo : req.file.filename
      }
      const user = await User.create(data)
      res.status(201).json({message : 'success register'})
    } catch (error) {
      next(error)
    }
  }
  
  static async login(req, res, next){
    try {
      const data = {
        email : req.body.email,
        password : req.body.password
      }
      const user = await User.findOne({
        where : {
          email : data.email
        }
      })
      if(!user) {
        throw {status : 401, message : 'Email or Password Wrong'}
      }
      if(!bcrypt.compareSync(data.password, user.password)){
        throw {status : 401, message : 'Email or Password Wrong'}
      }
      const token = jwt.sign({ email: data.email }, `${process.env.JWT_SECRET}`);

      res.status(200).json({access_token : token})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller