const ReviewProduct =require('../Models/ReviewProduct.model')

const reviewProductController={
    //POST
    createNewPost:(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    },

    // API
    getAllPost:async(req,res)=>{
        try {
            const listPosts=await ReviewProduct.find()
            return res.json(listPosts)
        } catch (error) {
            console.log(error)
            res.json({status:500,message:error.details[0].message})
            next(error)   
        }
    },
    getPostByUser:async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    },
}

module.exports=reviewProductController