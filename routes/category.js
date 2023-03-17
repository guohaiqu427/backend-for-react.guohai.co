const express = require("express")
const mongoose = require("mongoose")
const { Category, validate } = require("../models/category")
// const validateObjectId = require("../middleware/validateObjectId");
 

const router = express.Router()


router.post("/", async(req,res)=> {
    const error = validate(req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    let category = await Category.findOne({name: req.body.name})
    if(category) return res.status(400).send("categroy alredy exist")

    category = new Category ({
        name:  req.body.name,
    })
    
    const result = await category.save()
    res.send(result)
})

router.get("/", async(req,res)=> {
    const category = await Category.find()
    res.send(category)

})

router.get("/:id", async(req,res)=> {
    const category = await Category.find({_id: req.params.id})
    res.send(category)
})

router.put("/:id", async(req,res) => {
    const category = await Category.findOneAndUpdate(
        {_id: req.params.id},
        {name: req.body.name},
        {new:true}
        )
        res.send(category)
})

router.delete("/:id", async(req,res) => {
    const category = await Category.findOneAndRemove({_id:req.params.id})
    res.send(category)
})

module.exports = router
