const User = require('../models/user')
const Task = require('../models/task')

const addTask = async (req, res) => {
    try {
        console.log(req.body, req.headers['authorization'])
        const user = await User.findOne({ userName: req.headers['authorization'].userName, password: req.headers['authorization'].password })
        console.log('user', user)
        let task = {
            title: req.body.title,
            date: Date.now(),
            owner: user._id
        }
        const newTask = await new Task(task)
        console.log(newTask, user)
        await newTask.save()
        await user.tasks.push(newTask._id)
        await user.save()
        console.log(user)
        res.status(200).json({ message: 'task add', task: newTask })
    } catch (error) {
        res.status(500).json({ message: 'cannot create task', error: error })
    }
}
const getUserTask = async (req, res) => {
    console.log(req.body, req.headers['authorization'])
    try {
        const user = await User.findOne({ userName: req.headers['authorization'].userName, password: req.headers['authorization'].password })
        console.log("user", user)
        const allTasks = await Task.find({ owner: user._id })
        console.log("tasks", allTasks)
        res.status(200).json({ tasks: allTasks })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
const updateTask = async (req, res) => {
    console.log(req.body)
    try {
        let task = await Task.findByIdAndUpdate(req.body._id, { title: req.body.title })
        console.log(task)
        res.status(200).json({ message: 'task updated', task: task })
    } catch (error) {
        res.status(500).json({ message: 'cannot create user', error: error })
    }
}
const updateStatusTask = async (req, res) => {
    console.log(req.body)
    try {
        let task = await Task.findByIdAndUpdate(req.body._id, { completed: !req.body.completed })
        console.log(task)
        res.status(200).json({ message: 'task updated', task: task })
    } catch (error) {
        res.status(500).json({ message: 'cannot create user', error: error })
    }
}
const deleteTask = async (req, res) => {
    console.log(req.body)
    try {
        await Task.findByIdAndDelete(req.body._id)
        res.status(200).json({ message: 'task deleted' })
    } catch (error) {
        res.status(500).json({ message: 'cannot delete task', error: error })
    }
}


module.exports = { addTask, getUserTask, updateTask ,updateStatusTask,deleteTask}