import mongoose from 'mongoose'

const orderSchema=new mongoose.Schema({
     
    userId:{
        type:String,
        requried:true
    },
    items:{
        type:Array,
        requried:true
    },
    amount:{
        type:Object,
        requried:true
    },
    address:{
        type:String,
        requried:true
    },
    status:{
        type:String,
        requried:true,
        default:"Food processing"
    },
    payment:{
        type:Boolean,
        requried:true,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const orderModel=mongoose.models.order || mongoose.model("order",orderSchema);

export default orderModel;