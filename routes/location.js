const express = require('express')
const Location = require('../models/locations')
const checkUserType = require('../middleware/checkUserType')
const Auth = require('../middleware/Auth')
const router = express.Router()

//to create new Loacation
router.post('/new',Auth,checkUserType, async(req,res,next)=>{
    try {
    const input = new Location(req.body)
    const location = await input.save()
    res.send(location)   
    } catch (error) {
        next(error)
    } 
})

//list of all locations
router.get('/',async(req,res,next)=>{
    try {
      const locations = await Location.find({})  
      res.send(locations)
    } catch (error) {
        next(error)
    }
})

//delete location 
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        await Location.findOneAndDelete({_id: id})
        res.send({message: 'Location deleted'})
    } catch (error) {
        next(error)
    }
})

module.exports = router