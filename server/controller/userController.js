const { User } = require('../models/usermodel')
const jwt = require('jsonwebtoken')

const maxAge = 2 * 24 * 60 * 60;
const mySecretKey = process.env.SECRET_KEY;


function getToken(userID) {
    return jwt.sign({ userID }, mySecretKey, {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {
    const errors = {name:'', email: '', password: '' }

    // error code
    if (err.code == 11000) {
        errors["email"] = "email already used"
    }

    // invalid email OR password - login
    if(err.message == "invalid email"){
        errors.email = "invalid email"
    }
    if(err.message == "invalid password"){
        errors.password = "invalid password"
    }

    // validation of email & password - signup
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports.signup = async (req, res) => {
    const { fullName, email, password } = req.body
    console.log("signing up")
    try {
        const user = await User.create({ fullName, email, password })
        res.status(200).send({ "success": "signed up successfully"})
    }
    catch (err) {
        console.log("error signing up", err)
        const errors = handleErrors(err)
        res.status(500).send({ "errors": errors })
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    console.log("logging in")
    try{
        const user = await User.login(email, password)
        res.status(200).send({"success": getToken(user._id)})
    }
    catch(err){
        console.log("error logging in : ", err)
        const errors = handleErrors(err)
        res.status(500).send({"error" : errors})
    }
}