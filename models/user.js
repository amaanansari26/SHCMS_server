const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const user= new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    deviceId:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('user', user);