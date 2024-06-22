import express, { response } from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import { Book } from "../models/bookModels.js";
import bookRoutes from "../routes/bookRoutes.js"
import cors from 'cors';

dotenv.config({
    path:'./env'
})

const app=express();

// middleware for parsing request body
app.use(express.json())
// if above line of code not written then 
// we were not able to able to send request in json format
// from postman 

// below we are creating route
app.get('/', (req,res)=>{
    console.log(req);
    return res.status(234).send('welocme')
})

// middleware for handling cors policy
// Option 1 :Allows all orign with default of cors(*)
app.use(cors())

// option 2:allow custom origins
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["GET", 'POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type']
// }))

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running at port : ${process.env.PORT}`);
})

app.use('/books',bookRoutes)
// in above we are not using app.put() , app.get() , app.push() or any other app.httpRequest
// because here we have created different folder for route
// and whenever this done then we use routes as middleware
// therefore app.use()




// connecting to database
const DB_NAME ="BookStore"
mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
.then(()=>{
    console.log("Database connected successfully");
    

})
.catch((error)=>{
    console.log("mongodb connection error" ,error);
});