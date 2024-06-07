import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from "helmet";
import cors from "cors";
//import xss from "xss"


import connectDB from './db/connect.js';

//Routes
import userRouter from './routes/userRouter.js'
import goalRouter from './routes/goalRouter.js'


//Middleware
import errorHandler from './middleware/errorHandler.js';
import notFoundMiddleware from './middleware/notFound.js';







const app = express();
const port = 5000;

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

if(process.env.NODE_ENV === 'development'){
    app.use((morgan('dev')))
}



app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json());
app.use(helmet());
app.use(cors())
//app.use(xss())
app.use(cookieParser());

// if(process.env.NODE_ENV !== 'production'){
//     app.use(morgan('dev'));
// }

app.use('/api/v1/users', userRouter)
app.use('/api/v1/goals', goalRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
}) 


// app.get('/', (req, res) => {
//     res.send('Planny')
// })


app.use(notFoundMiddleware)
app.use(errorHandler)

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
         app.listen(port, () => {
            console.log('app listening on port 5000')
         })
    } catch (error) {
        console.log(error)
    }
}

start()