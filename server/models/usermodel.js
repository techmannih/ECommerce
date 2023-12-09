const mongoose = require('mongoose')

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

// models
const User = mongoose.model('user', userSchema)

module.exports = { User }
