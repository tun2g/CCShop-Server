const mongoose=require('mongoose');
const CartSchema= new mongoose.Schema({
    shopid:{
        type:String,
        ref:'Shop'
    },
    userid:{
        type:String,
        ref:'User'
    },
    productid:{
        type:String,
        require:true,
        ref:'Product'
    },
    cost:{
        type:Number,
        require:true
    },
    size:{
        type:Number,
    },
    color:{
        type:String
    },
    quantity:{
        type:Number,
        require:true,
    },
},{ timestamps: true });

module.exports=mongoose.model('Cart',CartSchema);
