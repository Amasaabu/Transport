const express = require('express')
const Invoice = require('./models/Invoice')
const userRoutes = require('./routes/user')
const LocationRoutes = require('./routes/location')
const VehicleRoutes = require('./routes/vehicle')
const path = require('path')
const cluster = require('cluster')

//db
const db = require('./db/db')
db()
const app = express()
app.use(express.json())


app.use('/api/user', userRoutes)
app.use('/api/location', LocationRoutes)
app.use('/api/vehicle', VehicleRoutes)

// console.log(path.join(__dirname, 'front'))
if (process.env.MODE === 'production') {
    app.use(express.static( path.join(__dirname, 'front', 'build')))
    app.use('*', async(req,res)=>{
        res.sendFile(path.join(__dirname, 'front', 'build', 'index.html'))
    })
}
//handle 404 cases
app.use(async(req,res,next)=>{
    const err = new Error('Route Invalid')
    res.status(404)
    next(err)
})
//handle errors
app.use(async(err,req,res,next)=>{
    const statusCode = res.statusCode===200?500:res.statusCode
    res.status(statusCode)
    let errorMessage = 'An Error Occured'
    if(process.env.MODE=='development'){
        console.log(err.message)
        errorMessage = err.message
    }
    const error = {
        message: errorMessage,
        stack: err.stack
    }
    res.send(error)
})


app.listen(process.env.PORT, ()=>{
    console.log(`app is working on port ${process.env.PORT}`);
})

