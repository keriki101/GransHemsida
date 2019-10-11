const express = require('express')
const db = require('./db')

const router = express.Router()

router.get('/', function (request, response) {
    response.render('blog.hbs')
})

router.get('/create', function (request, response) {
    response.render('create.hbs')
})



module.exports = router