const { number } = require('joi');
const mongoose=require('mongoose');
const ProductSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    imageurl:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    introduction:{
        type:String,
    },
    size:{
        type:String,
    },
    color:{
        type:String,
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true,
    },
    shopid:{
        type:String,
        require:true,
        ref:'Shop'
    },
    rating:{
        type:Number,
        default:0,
    },
},{ timestamps: true });

module.exports=mongoose.model('Product',ProductSchema);
