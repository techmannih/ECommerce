const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

// schemas// its for user profile page
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        default: "John",
      },
    email: {
        type: String,
        required: true,
        unique: [true, 'email already used'],
        validate: [isEmail, "email is not valid"]
    },
    phoneNumber: {
        type: String,
        default: "",
      },
    password: {
        type: String,
        required: true,
        minLength: [6, "password must be 6 characters minimum"]
    },
    dateStamp: {
        type: Date,
        default: Date.now
    },
    country: {
        type: String,
        default: "",
      },
},

{timestamps:true},    
);




userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// static methods
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw new Error("invalid password")
    }
    throw Error("invalid email")
}

// models
const User = mongoose.model('user', userSchema)

module.exports = { User }
