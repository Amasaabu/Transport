const express = require('express')
const User = require('../models/users')
const router = express.Router()
const Auth = require('../middleware/Auth')

//signing up a user and generating token
router.post('/signup', async(req,res,next)=>{
    try {
    const input = req.body
    const new_user = new User(input)
    const user_data = await new_user.save()
    const token = await user_data.generateAuthToken()
    const user = user_data.toObject()
    delete user.password
    delete user.tokens
    res.status(201).send({user, token})
    } catch (error) {
        next(error)
    }
    
})

//sign-in a user and generate token
router.post('/signin', async(req,res,next)=>{
    try {
        const input = req.body
        const user_data = await User.AuthenticateUser(input.email, input.password)
        const token = await user_data.generateAuthToken()
        const user = user_data.toObject()
        delete user.password
        delete user.tokens
        res.send({user, token})
    } catch (error) {
        next(error)
    }
})


//view a profile
router.get('/profile',Auth, async(req,res)=>{
    const user_data = req.user
    const user = user_data.toObject()
     
    delete user.password
    delete user.tokens
    res.send(user)
})
module.exports = router