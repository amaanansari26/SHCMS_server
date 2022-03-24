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
    fireEmergency:{
        type:Boolean,
        required:true
    },
    theftEmergency:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('deviceOut', deviceOut);