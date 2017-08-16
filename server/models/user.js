let mongoose = require('mongoose');


let user = mongoose.model('User',{
    email:{
        type: String,
        require:true,
        trim:true,
        minlength:1
    }
});

module.exports.user=user;