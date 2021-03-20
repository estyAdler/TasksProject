const User = require('../models/user')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const exist = await User.find({ userName: req.body.userName, password: req.body.password })
        if (exist.length !== 0)
            return res.status(500).json({ message: 'choose an other password'})
        let newUser = new User(req.body)
        await newUser.save()
        let token = jwt.sign({ userName: req.body.userName, password: req.body.password }, process.env.SECRET)
        res.status(200).json({ message: 'user created', token: token })
    } catch (error) {
        res.status(500).json({ message: 'cannot create user', error: error })
    }
}
const login = async (req, res) => {
    try {
        const exist = await User.find({ userName: req.body.userName, password: req.body.password })
        if (exist.length === 0)
            return res.status(404).json({ message: 'user not found' })
        let token = jwt.sign({ userName: req.body.userName, password: req.body.password }, process.env.SECRET)
        console.log(token)
        res.status(200).json({ message: 'user login', token: token })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = { register, login }