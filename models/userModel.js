import bcrypt from 'bcryptjs'
import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        
    }, 

    lastName:{
        type: String
    },

    email:{
        type: String,
        unique: true,
         validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: 'Please provide a valid email address'
        }
    },

    password:{
        type: String, 
        select: false
    }
})


const { genSalt, hash } = bcrypt;

//Hash Password -- when registering 
UserSchema.pre('save', async function(){
    const salt = await genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//Create JWT -- when registering and login
UserSchema.methods.createJWT = function(){
    return jwt.sign({userID: this._id}, 'jwtSecret', {expiresIn: '1d'})
}


//Compare Password
UserSchema.methods.comparePasswords = async function(enteredPassword){
   const passwordMatch = await bcrypt.compare(enteredPassword, this.password)
   return passwordMatch
}


export default mongoose.model('Users', UserSchema);