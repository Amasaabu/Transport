const mongoose = require('mongoose')
let url = process.env.DATABASE_URL
if (process.env.MODE==='production') {
    url = process.env.EXTERNAL_DATABASE
}
const connectDb = async () => {
    try {
        const connection = await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log(`data base is connected on ${connection.connection.host}`)
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = connectDb