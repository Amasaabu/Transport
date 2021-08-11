const express = require('express')
const User = require('../models/users')
const router = express.Router()
const Auth = require('../middleware/Auth')
const utils = require('../functions/utility')
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
    // const user_data = req.user
    const toRemove = ['password', 'tokens']
    const user = utils.toObjectAndDelete(req.user, ...toRemove)
    res.send(user)
})

//all invoice booked by a user
router.get('/invoices', Auth, async(req,res, next)=>{
    try {
        console.log('invoices by user route hit')
        const user_found = await User.findOne({_id: req.user}).populate({path: 'invoices.invoice', populate: [{path:'vehicle_id', populate: ['depature', 'destination']}]})
        res.send(user_found.invoices)
    } catch (error) {
        next(error)
    }
})
//modify a profile
router.patch('/edit', Auth, async(req,res,next)=>{
    try {
        const input = req.body
        const inputKeys = Object.keys(input)
        const allowedUpdates = ['phoneNumber', 'surname', 'email']
        let not_allowed = []
        inputKeys.forEach((it)=>{
           const check = allowedUpdates.every(item=>it!==item)
            if (check) {
                not_allowed.push(it)  
            }
          
        })
        console.log(not_allowed)
        if (not_allowed.length) {
            const err = new Error(`you have to contact admins to update ${not_allowed}; you are only allowed to update ${allowedUpdates}`)
            next(err)
            return 
        }
        //run through the updates dynamically
        inputKeys.forEach((it)=>{
            req.user[it] = input[it]?input[it]:req.user[it]
        })
        const user = await req.user.save()
        res.send(user)
    } catch (error) {
        next(error)
    }
})

//invoices by a user 

module.exports = router