const {Schema, model} = require('mongoose')

const usersSchema = new Schema({
    // id: {
    //     type: String,
    //     required: true,
    // },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = model('usersSchema', usersSchema)