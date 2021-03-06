const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
let UserSchema = new mongoose.Schema(
    {
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
    }
);


UserSchema.methods.toJSON=function () {
  let user =this;

  let userObject = user.toObject();

  return _.pick(userObject,['_id','email']);
};


UserSchema.methods.generateAuthToken = function () {
let user = this;

let access ='auth';

let token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

user.tokens.push({access, token});

return user.save().then(() => {
    return token;
});
};

let user = mongoose.model('User',UserSchema);

module.exports.user=user;