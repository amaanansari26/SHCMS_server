const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const deviceOut= new Schema({
    deviceId:{
        type:Number,
        required:true
    },
    temp:{
        type:Number,
        required:true
    },
    humid:{
        type:Number,
        required:true
    },
    emergency:{
        type:Boolean
    }
});

module.exports = mongoose.model('deviceOut', deviceOut);