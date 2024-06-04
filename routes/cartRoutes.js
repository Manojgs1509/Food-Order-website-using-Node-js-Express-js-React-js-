import express from 'express'
import { addToCart,removeCart,getCart } from "../controller/shopController.js";
import authMiddleware from '../middleware/auth.js';


const shopRouter=express.Router();

shopRouter.post('/add',authMiddleware,addToCart);
shopRouter.post('/remove',authMiddleware,removeCart);
shopRouter.post('/get',authMiddleware,getCart);


export default shopRouter;
