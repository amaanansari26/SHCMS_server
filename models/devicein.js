const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const deviceIn= new Schema({
    deviceId:{
        type:String,
        required:true
    },
    s0:{
        type:String,
        required:true
    },
    s1:{
        type:String,
        required:true
    },
    s2:{
        type:String,
        required:true
    },
    s3:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('deviceIn', deviceIn);