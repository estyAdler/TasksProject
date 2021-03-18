const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        require:true
    },
    completed: {
        type: Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    }
})

module.exports = mongoose.model('Task', taskSchema)