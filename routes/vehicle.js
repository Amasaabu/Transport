const express = require('express')
const Vehicle = require('../models/Vehicles')
const Locations = require('../models/locations')
const router = express.Router()
const Auth = require('../middleware/Auth')
const checkUserType = require('../middleware/checkUserType')
const Invoice = require('../models/Invoice')
const functions = require('../functions/utility')

//route to post new vehicle
router.post('/new',Auth,checkUserType, async (req,res,next)=>{
    try {
        //checks number of passangers vehicle can take
        const maxpassangers = req.body.seatsavailable.length
        console.log(maxpassangers)
        const vehicle_details = new Vehicle({...req.body, maxpassangers})
        await vehicle_details.save()
        res.status(201).send(vehicle_details)
    } catch (error) {
        next(error)
    }
})

//route to list all vehicles
router.get('/all',Auth,checkUserType, async (req,res,next)=>{
    try {
        const vehicles = await Vehicle.find({})
        res.send(vehicles)
    } catch (error) {
        next(error)
    }
})

//route to modify a vehicle
router.patch('/modify/:id', Auth, checkUserType,  async (req,res)=>{
    try {
    const id  = req.params.id
    const vehicle = await Vehicle.findOne({_id: id})
    if (!vehicle) {
        res.status(404)
        const err = new Error('Vehicle not found')
        next(err)
        return
    }
        vehicle.maxpassangers = req.body.maxpassangers ? req.body.maxpassangers : vehicle.maxpassangers
        vehicle.depaturedate = req.body.depaturedate ? req.body.depaturedate : vehicle.depaturedate
        vehicle.depature = req.body.depature ? req.body.depature : vehicle.depature
        vehicle.destination = req.body.destination ? req.body.destination : vehicle.destination
        vehicle.amount = req.body.amount ? req.body.amount : vehicle.amount
        const new_details = await vehicle.save()
        res.send(new_details)
    } catch (error) {
        next(error)
    }
})

// route to delete a vehicle
router.delete('/:id', async (req,res,next)=>{
    try {
        const id = req.params.id
        await Vehicle.findOneAndDelete({_id: id})
        res.status(200).send('deleted succesfully')
    } catch (error) {
        next(error)
    }
})

// searching a vehicle by a particular parameter
router.post('/search', async (req, res, next) => {
    try {
        console.log('route hit');
        const inputKeys = Object.keys(req.body)
        const searchObj = {}
        for (const iterator of inputKeys) {
            let value = req.body[iterator]
            //checks when there is an empty item in the object as in the case of searching based on a single criterium
            if (value === '') {
                continue 
            } 
            //conver to date 
            if (iterator==='depaturedate') {
                console.log(value)
                const date = new Date(value)
                console.log(date)
                value =date
            }
            

            //get id from location entered
            // if (iterator === 'depature'|| iterator === 'destination') {
            //     const locations = await Locations.find({})
            //     const location = locations.find(it => it.state === value)
            //     const { _id: vehicle_id } = location
            //     value= vehicle_id
            // } 
            searchObj[iterator] = value  
        }
        console.log(searchObj)
        const vehicle = await Vehicle.find(searchObj).populate('depature').populate('destination')
        if (!vehicle.length) {
            res.status(404)
            const err = new Error('No result, Try again')
            next(err)
            return
        }
        res.send(vehicle)
    } catch (error) {
        next(error)
    }
})

//create a new invoice
router.post('/invoice/',async (req,res,next)=>{
    try {
        const input = req.body
        const invoice = new Invoice(input)
        const vehicle = await Vehicle.findOne({_id: input.vehicle_id})

        // changes the occupied state of seat in vehicle model
        for (const iterator of invoice.seatsposition) {
            vehicle.seatsavailable.forEach((it, num) => {
                if (it._id.toString() === iterator.seat_id.toString()) {
                    console.log(num)
                    vehicle.seatsavailable[num].occupied = true
                }
            })
        }
        //getting number of passangers based on input
        const numberofpeoplebookedfor = input.seatsposition.length
        if (!vehicle) {
            res.status(404)
            const err = new Error('Something went wrong')
            next(err)
            return
        }
        //update number of seat left on the vehicle
        vehicle.maxpassangers = vehicle.maxpassangers - numberofpeoplebookedfor
        if (vehicle.maxpassangers<0) {
            res.status(400)
           const err = new Error ('no more tickets available, check back later')
           next(err)
           return
        }
        //the total amount to be paid
        const amount = vehicle.amount
        invoice.amounttobepaid = amount*numberofpeoplebookedfor
        const saved_invoice = await invoice.save()
        const {id} = saved_invoice
        //this is to ensure we poulate virtual fields before sending response
        const search_invoice = await Invoice.findOne({ _id: id }).populate({ path: 'vehicle_id', populate: ['destination', 'depature'] })
        await vehicle.save()
        res.send(search_invoice)
    } catch (error) {
        next(error)
    }
})
//2)we have to create a route to get all seats available in a bus

//route to get invoice details
router.get('/invoice/:id', async(req,res,next)=>{
    try {
        const id = req.params.id
        const invoice = await Invoice.findOne({ _id: id }).populate({path: 'vehicle_id', populate: ['destination', 'depature']})
        // const invoice_object = invoice.toObject()
        // delete invoice_object.vehicle_id.seatsavailable
        // delete invoice_object.vehicle_id._id
        // delete invoice_object.vehicle_id.platenumber
        const things_to_remove = ['vehicle_id.seatsavailable', 'vehicle_id.platenumber']
        const invoice_object = functions.toObjectAndDelete(invoice, ...things_to_remove)
        if (!invoice) {
            res.status(404)
            const err = new Error('Invoice Not found')
            next(err)
        }
        res.send(invoice_object)
    } catch (error) {
    next(error) 
    }
})

// const arr = ['12e', 'wsdwf', {name: 'ade', other: {age: '23'}}]
// const val = 'other'
// console.log(arr[2]['other'].age)

module.exports=router