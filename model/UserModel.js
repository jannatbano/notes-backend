const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        unique: true
    },
    password:{
        type : String,
        required : true,
    },
    resetPasswordToken:String,
    resetPasswordExpires: Date,
});

const user= mongoose.model('User',userShema);
module.exports = user