import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'

const authenticateUser = async(req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        throw new Error('Unauthorized to perform this action')
    }


    try {
         const payload = jwt.verify(token, 'jwtSecret');
         req.user = {userID: payload.userID}
         next();
    } catch (error) {
        console.log(error)
    }

}

export default authenticateUser