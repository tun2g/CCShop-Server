const Cart=require('../Models/Cart.model')
const Product =require('../Models/Product.model')

const cartController={

    //CRUD
    addToCart:async(req,res)=>{
        try {
            const{shopid,userid,productid,quantity,cost,size,color}=req.body
            const cart=new Cart({
                shopid,
                userid,
                productid,
                quantity,
                cost,
                size,
                color,  
            })
            await cart.save()
            res.send('add successfully')
        } catch (error) {
            console.log(error)   
        }
    },
    deleteCart:async(req,res)=>{
        try {
            const _id=req.params.id
            await Cart.findOneAndDelete({_id})
            if(!Cart){
                res.send("Cart is not exist")
            }
            else res.send("delete successfully")
        } catch (error) {
            
        }
    },
    updateCart:async(req,res)=>{
        try {

            const {cost,quantity,_id}=req.body
            
            await Cart.findOneAndUpdate({_id},{$set:{ cost,quantity}},{
                new: true
            })

            res.send("update successfully")
        } catch (error) {
            
        }
    },

    //API
    getCartsByUser:async(req,res)=>{
        try {
            const userid=req.params.key

            // get list Carts by user 
            const listCarts=await Cart.find({userid})
            
            // get list Products id from list Cards
            const listId = listCarts.map((p)=>{return p.productid})
            // 
            // Tìm các sản phẩm có ID nằm trong danh sách
            const list =await Cart.find({ userid,productid: { $in: listId } })
                .populate("productid") 
            //
            
            console.log(list)
            return res.send(list)

        } catch (error) {
            console.log(error)
        }

    },
    getCartsByShop:async(req,res)=>{
        try {
            const shopid=req.params.key
            const listCarts=await Cart.find({shopid})
            const list=listCarts.map(p=>{
                p.email=''
                delete p['email']
                return p          
            })
            return res.json(list)
        } catch (error) {
            console.log(error)
        }
        
    }

}

module.exports=cartController