const mongoose = require('mongoose');
const validator = require('validator');

let user = mongoose.model('User',{
    email:{
        type: String,
        require:true,
        trim:true,
        minlength:1,
        unique: true,
        validate : {
            isAsync: true,
            validator: validator.isEmail
        ,
            message: '{VALUE} is not a valid email'
        }
    },
    password : {
        type: String,
        require: true,
        minlength: 6
    },
    tokens:[
        {
            access: {
                type: String,
                require: true
            },
            token : {
                type: String,
                require: true
            }
        }
    ]
});

module.exports.user=user;