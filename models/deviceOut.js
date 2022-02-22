const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const deviceIn= new Schema({
    deviceId:{
        type:String,
        required:true
    },
    temp:{
        type:String,
        required:true
    },
    humid:{
        type:String,
        required:true
    },
    emergency:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('deviceIn', deviceIn);