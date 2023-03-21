const mongoose=require('mongoose');
const PostSchema= new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    product:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true
    },

});

module.exports=mongoose.model('Post',PostSchema);
