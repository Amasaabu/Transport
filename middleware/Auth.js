const User = require('../models/users')
const jwt = require('jsonwebtoken')

const Auth = async(req,res,next)=>{
    try {
       const token =  req.header('Authorization').replace('Bearer ', '')
       const {id} = jwt.verify(token, process.env.TOKENPASSCODE)
       const user = await User.findOne({_id: id, 'tokens.token': token})
       req.user = user
       next()
    } catch (error) {
        console.log(error);
        const err = new Error('Please re-Authenticate')
        next(err)
    }
}

module.exports = Auth