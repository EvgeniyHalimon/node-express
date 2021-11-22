const express = require('express')
const { getContacts } = require('../controllers/contact-contriller')

const router = express.Router()

router.get('/contacts', getContacts)

module.exports = router