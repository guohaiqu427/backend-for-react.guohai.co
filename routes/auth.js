const express = require("express")
const { User } = require("../models/user")
const bcrypt = require('bcrypt');
const Joi = require("joi")

const router = express.Router()


router.post("/", async(req,res)=> {
    const error = validate(req.body).error 
    if(error) return res.status(400).send("invalid emial or password")

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("invalid emial or password")

    const isValid = await bcrypt.compare(req.body.password, user.password)
    if(!isValid) return res.status(400).send("invalid emial or password")

    const token = user.generateAuthToken()

    res.send(token)

})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(req)
}

module.exports = router
