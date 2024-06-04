import orderModel from "../models/orderModels.js";
import userModel from '../models/userModel.js';
import Stripe from 'stripe';



const stripe=new Stripe(process.env.STRIPE_SCERET_KEY);
const frontend_url="http://localhost:5173";

//place order using frontend

const placeOrder=async (req,res)=>{
     
     try {
        
        const newOrder=new orderModel({
             
             userId:req.body.userId,
             items:req.body.items,
             amount:req.body.amount,
             address:req.body.address
        })

        await  newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items=req.body.items.map((item)=> ({
              
               price_data:{
                   currency:"inr",
                   product_name:{
                      name:item.name
                   },
                   unit_amount:item.price*100*80,
               },
               quantity:item.quantity

        }));

        line_items.push({
             
            price_data:{
                 currency:"inr",
                 product_name:{
                     name:"Delivery Charges"
                 },
                 unti_amount:2*100*80
            },
            quantity:1
        })

        const session= await stripe.checkout.sessions.create({
             line_items:line_items,
             mode:'payment',
             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,

        })

        res.json({success:true , session_url:session})

     } catch (error) {
        console.log(error);
        res.json({success:false , message:"Error"})
     }
}

const verifyOrder=async (req,res)=>{

    const {orderId,success}=req.body;

    try {
        if(success === 'true'){
             
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"paid"})
        }
    } catch (error) {
        console.log(error);
    }

}

export {placeOrder,verifyOrder}