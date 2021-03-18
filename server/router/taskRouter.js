const router = require('express').Router()
const task=require('../controllers/taskController')
const jwt = require('jsonwebtoken')

router.use((req, res, next) => {
    const verify = jwt.verify(req.headers['authorization'], process.env.SECRET)
    req.headers['authorization'] = verify
    next()
})

router.post('/addTask',task.addTask)
router.get('/getUserTask',task.getUserTask)
router.put('/updateTask',task.updateTask)
router.put('/updateStatusTask',task.updateStatusTask)
router.delete('/deleteTask',task.deleteTask)

module.exports=router

