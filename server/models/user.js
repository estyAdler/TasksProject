const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    lastName:{
        type:String,
        require: true
    },
    password:{
        type: String,
        minlength: 6
    },
    tasks: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }
    ]
})
module.exports = mongoose.model('User', userSchema);
