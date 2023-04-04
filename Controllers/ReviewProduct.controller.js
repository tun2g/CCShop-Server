const ReviewProduct =require('../Models/ReviewProduct.model')
const User =require('../Models/User.model')

const reviewProductController={

    //CRUD
    postReview:async(req,res)=>{
        try {
            const {productid,userid,rating,comment}=req.body
            if(!userid){
                res.send("Please Login")
            }
            const updateReview= await ReviewProduct.findOne({productid,userid})
            
            if(!updateReview){
                const reviewProduct=new ReviewProduct({
                    productid,userid,rating,comment
                })
                await reviewProduct.save()
                res.send("review successfully")
            }
            updateReview.rating=rating
            updateReview.comment=comment
            await updateReview.save()
            res.send("update review")
            
        } catch (error) {
            console.log(error)
        }
    },

    deleteReview:async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    },
    updateReview:async(req,res)=>{
        try {
            const _id=req.params.id
            const {feedback,avatarshop,shopname,userid}=req.body
            const updateReview= await ReviewProduct.findOne({productid:_id,userid})
            updateReview.feedback=feedback
            updateReview.avatarshop=avatarshop
            updateReview.shopname=shopname
            await updateReview.save()

            res.send("Thêm phản hồi thành công")

        } catch (error) {
            console.log(error)
        }

    },


    // API
    getReviewByProduct:async(req,res)=>{
        try {
            const productid=req.params.id
            const listComments=await ReviewProduct.find({productid})
            
            const listId=listComments.map((c)=>c.userid)

            const list=await ReviewProduct.find({ productid,userid: { $in: listId } })
                        .populate("userid")
            return res.json(list)
        } catch (error){
            console.log(error)
            res.json({status:500,message:error.details[0].message})
            next(error)   
        }
    },
    
}

module.exports=reviewProductController