const mongoose=require('mongoose');
const ReviewProductSchema= new mongoose.Schema({
    userid:{
        type:String,
        require:true,
        ref:'User'
    },
    productid:{
        type:String,
        require:true,
        ref:'Product',
    },
    rating:{
        type:Number,
        require:true
    },
    comment:{
        type:String
    },
    isReacted:{
        type:Boolean,
        default:false,
    },
    feedback:{
        type:String
    },
    avatarshop:{
        type:String
    },
    shopname:{
        type:String
    }
},{ timestamps: true });

module.exports=mongoose.model('ReviewProduct',ReviewProductSchema);
