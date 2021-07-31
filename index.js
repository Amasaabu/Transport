const express = require('express')
// //importing models
// const User = require('./models/users')
// const Vehicles = require('./models/Vehicles')
const Invoice = require('./models/Invoice')
//importing routes
const userRoutes = require('./routes/user')
const LocationRoutes = require('./routes/location')
const VehicleRoutes = require('./routes/vehicle')
//db
const db = require('./config/db')
db()
const app = express()
app.use(express.json())


app.use('/api/user', userRoutes)
app.use('/api/location', LocationRoutes)
app.use('/api/vehicle', VehicleRoutes)
//handle 404 cases
app.use(async(req,res,next)=>{
    const err = new Error('Route Invalid')
    res.status(404)
    next(err)
})


app.use(async(err,req,res,next)=>{
    const statusCode = res.statusCode===200?500:res.statusCode
    res.status(statusCode)
    if(process.env.MODE=='development'){
        console.log(err.message)
    }
    const error = {
        message: err.message,
        stack: err.stack
    }
    res.send(error)
})


app.listen(process.env.PORT, ()=>{
    console.log(`app is working on port ${process.env.PORT}`);
})

