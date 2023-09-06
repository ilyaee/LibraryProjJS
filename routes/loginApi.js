const express = require('express')
const router = express.Router()

const user = {
    id: 1,
    mail: "test@mail.ru"
}

router.post('/', (req, res) => {
    res.status(201)
    res.json(user)
})

module.exports = router