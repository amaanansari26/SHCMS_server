const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const deviceIn= new Schema({
    deviceId:{
        type:Number,
        required:true
    },
    s0:{
        type:Boolean,
        required:true
    },
    s1:{
        type:Boolean,
        required:true
    },
    s2:{
        type:Boolean,
        required:true
    },
    s3:{
        type:Boolean,
        required:true
    },
    s4:{
        type:Boolean,
        required:true
    },
    s5:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('deviceIn', deviceIn);