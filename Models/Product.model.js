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
    information:{
        type:String
    },
    description:{
        type:String,
        require:true,
    },
    detail:{
        type:String,
    },
    descriptiondetail:{
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
    }
});

module.exports=mongoose.model('Product',ProductSchema);
