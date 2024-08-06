import express from 'express';
import mongoose from 'mongoose';
import productRouter from "./Routes/product.js"
import cartRouter from "./Routes/cart.js";
import bodyParser from 'express';
import userRouter from './Routes/user.js';
import addressRouter from './Routes/address.js';
 const app=express();
 app.use(bodyParser.json());
 //home testing route
 app.get('/',(req,res)=>res.json({message:"This is Home Route"}));
 //user router
 app.use('/api/user',userRouter)
 //product Router
 app.use('/api/product',productRouter);
 //cart Router
 app.use("/api/cart",cartRouter);
 // add Address 
 //git check comment
 app.use("/api/address",addressRouter);
 mongoose.connect("mongodb+srv://DIVYANSH:Divyansh930@cluster0.1fdgimp.mongodb.net/",{dbName:"MERN_E_Commerce"})
 .then(()=>{console.log("Mongo DB is connected Successfully..")})
 .catch((err)=>{console.log(err)});//MPC structure
 const port=1000;
 app.listen(port,()=>{console.log(`server is running on port ${port}`)});