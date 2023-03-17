const express = require("express")
const mongoose = require("mongoose")
const { Tag, validate } = require("../models/tag")
 

const router = express.Router()


router.post("/", async(req,res)=> {
    const error = validate(req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    let tag = await Tag.findOne({name: req.body.name})
    if(tag) return res.status(400).send("tag name alredy exist")

    tag = new Tag ({
        name:  req.body.name,
    })
    
    const result = await tag.save()
    res.send(result)
})

router.get("/", async(req,res)=> {
    const tag = await Tag.find()
    res.send(tag)

})
router.get("/:id", async(req,res)=> {
    console.log(req.params.id)
    const tag = await Tag.find({_id: req.params.id})
    res.send(tag)
})

router.put("/:id", async(req,res) => {
    const tag = await Tag.findOneAndUpdate(
        {_id: req.params.id},
        {name: req.body.name},
        {new:true}
        )
        res.send(tag)
})

router.delete("/:id", async(req,res) => {
    const tag = await Tag.findOneAndRemove({_id: req.params.id})
    res.send(tag)
})

module.exports = router
