const router = require('express').Router()
const jwt = require('jsonwebtoken')
const user = require('../controllers/userController')

router.use((req, res, next) => {
    console.log('req', req.url)
    if (req.url === '/login') {
        // let token = jwt.sign({})
    }
    next()
})
router.post('/register', user.register)
router.post('/login', user.login)

module.exports = router

