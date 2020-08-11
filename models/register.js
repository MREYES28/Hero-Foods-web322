const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const registerSchema =  new Schema({
    username: {type: String, required:true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    type: {type:String, default:"User"}

});

registerSchema.pre("save",function(next)
{

    //salt random generated characters or strings
    bcrypt.genSalt(10)
    .then((salt)=>{
        
        bcrypt.hash(this.password,salt)
        .then((encryptPassword)=>{
            this.password = encryptPassword;
            next();

        })
        .catch(err=>console.log(`Error occured when hashing ${err}`));
    })
    .catch(err=>console.log(`Error occured when salting ${err}`));

})

const registerModel = mongoose.model('register', registerSchema);

module.exports = registerModel;