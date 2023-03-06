const { number } = require('joi');
const mongoose=require('mongoose');
const PostSchema= new mongoose.Schema({
    email:{
        type:String,
        lowercase:true,
        unique:true,
        require:true
    },
    product:{
        type:String,
        require:true
    },
    cost:{
        type:Number,
        require:true
    }
});

module.exports=mongoose.model('Post',PostSchema);
