const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    surname: {
        type: String
    },
    password: {
        type: String,
        validate(value) {
            if (value<5) {
                throw new Error('Password cant be less than 5 characters')
            }
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tokens: [{token: {type: String}}]
})

userSchema.statics.AuthenticateUser = async(email,password)=>{
    const user = await User.findOne({email: email})
    if (!user) {
        throw new Error('Incorrect email')
    }
    const verifyPassword = await bcrypt.compare(password, user.password)
    if (!verifyPassword) {
        throw new Error('password Incorrect')
    }
    return user
}

userSchema.methods.generateAuthToken = async function() {
    const user = this

    const token = jwt.sign({id: user._id}, process.env.TOKENPASSCODE)
    user.tokens.push({token})
    await user.save()
    return token
}


userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 8)
    user.password = hashedPassword
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User