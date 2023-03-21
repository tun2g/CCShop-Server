const { number } = require('joi');
const mongoose=require('mongoose');
const ProductSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    key:{
        type:String,
        require:true,
    },
    imageurl:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true,
    }
});

module.exports=mongoose.model('Product',ProductSchema);
