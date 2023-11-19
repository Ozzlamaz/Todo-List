const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// signup static method
userSchema.statics.signup = async function(userName, email, password) {
    if(!userName || !email || !password) {
        throw Error ('All Fields must be filled!')
    }
    if(!validator.isEmail(email)) {
        throw Error ('Email is not Valid!')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error ('Password is not strong enough!')
    }


    const userNameExists = await this.findOne({ userName })
    const emailExists = await this.findOne({ email })

    if(userNameExists) {
        throw Error ('User already in use!')
    } if(emailExists) {
        throw Error ('Email already in use!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({userName, email, password: hash})

    return user
}

// signup login method
userSchema.statics.login = async function(email, password) {

    if(!email || !password) {
        throw Error ('All field must be filled!')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error ('Invalid Email!')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error ('Incorrect Password!')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)