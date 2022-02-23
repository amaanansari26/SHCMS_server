const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const soldDevice= new Schema({
    deviceId:{
        type:String,
        required:true
    },
    secretCode:{
        type:String,
        required:true
    },
    isActivated:{
        type:Boolean,
        required:true
    },
    userEmail:{
        type:String,
        
    }
});

module.exports = mongoose.model('soldDevice', soldDevice);