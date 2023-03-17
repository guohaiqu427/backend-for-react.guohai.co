const express = require("express")
const mongoose = require("mongoose")
const { Category } = require("../models/category")
const { Decker, validate } = require("../models/decker")
const { Tag } = require("../models/tag") 
 
const router = express.Router()

router.post("/", async(req,res)=> {
    const error = validate(req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    const tag = await Tag.findById(req.body.tagId)
    if (!tag) return res.status(400).send("Invalid tag.");

    const category = await Category.findById(req.body.categoryId)
    if (!tag) return res.status(400).send("Invalid tag.");


    const decker = new Decker ({
        question:  req.body.question,
        answer: req.body.answer,
        tag: {
            _id: tag._id,
            name: tag.name
        },
        category: {
            _id: category._id,
            name: category.name
        }
    })
    
    const result = await decker.save()
    res.send(result)
})

router.get("/", async(req,res)=> {
    const decker = await Decker.find()
    res.send(decker)

})

router.get("/:id", async(req,res)=> {
    const decker = await Decker.findOne({_id: req.params.id})
    res.send(decker)

})

router.delete("/:id", async(req,res)=> {
    const decker = await Decker.findOneAndRemove({_id: req.params.id})
    res.send(decker)

})

router.put("/:id", async(req,res) => {
    const tag = await Tag.findById(req.body.tagId);
    const category = await Category.findById(req.body.categoryId);
    console.log(tag,category)

    const decker = await Decker.findOneAndUpdate(
        {_id: req.params.id},
        {
            question: req.body.question,
            answer: req.body.answer,
            tag: {
                _id: tag._id,
                name: tag.name
            },
            category: {
                _id: category._id,
                name: category.name
            }
        },
        {new:true}
        )
        res.send(decker)
})

module.exports = router
