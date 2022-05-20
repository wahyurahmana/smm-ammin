const {User} = require('../models')

class Controller {
  static async register(req, res, next){
    console.log(req.file, 'ini req file')
    // console.log(req.body, 'ini req body')
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
  static login(req, res, next){
    console.log('login');
  }
}

module.exports = Controller