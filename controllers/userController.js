import { StatusCodes } from "http-status-codes"
import User from '../models/userModel.js'
import attachCookie from "../utils/helpers.js"

const test = async(req, res) =>{
    const users = await User.find({})
    res.status(StatusCodes.OK).json({users})
}

const register = async(req, res) => {
    const {firstName, lastName, email, password} = req.body;

    //Missing Values
    if(!firstName || !lastName || !email || !password){
        throw new Error('Please provide all values')
    }

     //Email is a valid email address

    //Handled in errorHandler -- 11000 Error
    // const emailAlreadyExists = await User.find({email});
    // if(emailAlreadyExists){
    //     throw new Error('Email already being used')
    // }

    const user = await User.create({
        firstName,
        lastName,
        email, 
        password
    })

    const token = user.createJWT();
    attachCookie({res, token})
   
    res.status(StatusCodes.OK).json({message: 'Account has been created! Redirecting...'})
}


const login = async(req, res) => {
    //Missing fields
    const {email, password} = req.body;
    console.log(email, password)

    if(!email || !password){
        throw new Error('Please provide all values')
    }

    //Check if email exists
    const user = await User.findOne({email}).select('+password');
    if(!user){
        throw new Error('User not found with this email address')
    }

    //Passwords Match,
     const passwordsMatch = await user.comparePasswords(password)
     if(!passwordsMatch){
        throw new Error('Password is incorrect!')
     }

     const token = await user.createJWT();
     attachCookie({res, token});

     res.status(StatusCodes.OK).json({message: 'Login Successful!, Redirecting...'})
}

const logout = async(req, res) => {
     res.cookie('token', null, {  httpOnly: true, expires: new Date(0) });
     res.send({message:'Logout User'})
}


const getCurrentUser = async(req, res) => {
    const user = await User.findOne({_id: req.user.userID})
    if(!user){
        throw new Error('No user found!')
    }

    res.status(StatusCodes.OK).json({user})
}

export {test, register, login, logout, getCurrentUser}