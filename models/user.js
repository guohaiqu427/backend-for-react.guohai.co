const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require('jsonwebtoken');
const config = require("config")


const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }
})


userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, config.get("jwtPrivateKey"))
    return token
}

const User  = mongoose.model('User', userSchema);


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(30).required().email(),
        password: Joi.string().min(3).max(30).required()
    })
    return schema.validate(user)
}


exports.User = User
exports.validate = validateUser
