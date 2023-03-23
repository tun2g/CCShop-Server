const mongoose=require('mongoose');

const ShopSchema= new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        require:true,
    },
    shopname:{
        type:String,
        index:true,
        unique:true,
        require:true,
    },
    address:{
        type:String,
        require:true
    },
    phonenumber:{
        type:String,
        require:true
    },
});


  
module.exports=mongoose.model('Shop',ShopSchema);