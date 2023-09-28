const {Schema, model} = require('mongoose')

const librarySchema = new Schema({
    // id: {
    //     type: String,
    //     required: true,
    // },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: true,
    },
    favorite: {
        type: String,
        default: "false"
    },
    fileCover: {
        type: String,
    },
    fileName: {
        type: String,
    },
})

module.exports = model('librarySchema', librarySchema)