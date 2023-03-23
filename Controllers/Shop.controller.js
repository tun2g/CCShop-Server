const Shop=require('../Models/Shop.model')
const User=require('../Models/User.model')

const shopController={
    registerShop:async (req,res)=>{
        try {
            let {email,shopname,phonenumber,address}=req.body
            const shop=new Shop({
                email,shopname,phonenumber,address
            })
            const updateUser=await User.findOne({email})
            updateUser.isShop=true
            await updateUser.save()
            await shop.save()
        } catch (error) {
            console.log(error)
        }
    },

    changeInfomationShop:async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    },

}


module.exports=shopController