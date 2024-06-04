import express from 'express'
import cors from 'cors'
import { connectDb } from './config/connectDb.js';
import foodRouter from './routes/foodRoutes.js';
import  userRouter  from './routes/userRoutes.js';
import 'dotenv/config.js'
import shopRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';



// app config
const app=express();
const port=4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDb()


//api endpoints
app.use('/api/food',foodRouter);
app.use('/images',express.static('uploads'));
app.use('/api/user',userRouter);
app.use('/api/cart',shopRouter);
app.use('/api/order',orderRouter);

app.get('/',(req,res)=>{
     
     res.send('API is working');
})



app.listen(port,(req,res)=>{
     
    console.log(`server started on http://localhost:${port}`);
})