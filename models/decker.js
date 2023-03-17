const mongoose = require("mongoose")
const Joi = require("joi")
const {tagSchema} = require("./tag")
const {categorySchema} = require("./category")

const deckerSchema = new mongoose.Schema ({
    question: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300,
    },
    answer: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300,
    },
    tag: {
        type: tagSchema,
        ref:"Tag",
        require: true
    }, 
    category: {
        type: categorySchema,
        ref:"Category"
    }
})

const Decker  = mongoose.model('Decker', deckerSchema);

function validateDecker(decker) {
    const schema = Joi.object({
        question: Joi.string().min(3).max(30).required(),
        answer: Joi.string().min(3).max(30).required(),
        tagId: Joi.string().required(),
        categoryId: Joi.string().required(),
    })
    return schema.validate(decker)
}


exports.Decker = Decker
exports.validate = validateDecker
