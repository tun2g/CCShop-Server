const Post =require('../Models/Post.model')

const postController={
    //POST
    createNewPost:(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    },

    // API
    getAllPost:async(req,res)=>{
        try {
            const listPosts=await Post.find()
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

module.exports=postController