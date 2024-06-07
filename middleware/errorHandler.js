import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleware = (err, req, res, next) => {
   
    if(err.code && err.code === 11000){
        res.status(500).json({message: 'Email already in use'})
    } else {
        res.status(500).json({message: err.message})
    }
    }
   

export default errorHandlerMiddleware