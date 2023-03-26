const Product = require('../Models/Product.model')

const productController={
    
  
  //CRUD
    postProduct:async(req,res)=>{
        try {
            const product = new Product({
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                description: req.body.description,
                imageurl: req.body.file,
                shopid:req.body.shopid,
            })
            product.save((err, savedProduct) => {
                if (err) {
                  console.error(err);
                  res.status(500).send('Internal Server Error');
                } else {
                  res.send(savedProduct);
                }
              });
        } catch (error) {
            console.log(error)
        }
    },
    updateProduct:async(req,res)=>{
        try {
            const updateProduct= await Product.findOneAndUpdate({_id},{$set:{
                price,
            }}, {} )     
        } catch (error) {
          
        }
    },
    deleteProduct:async(req,res)=>{
        try {
          
        } catch (error) {
          
        }
    },


    //API
    getAllProduct:async (req,res)=>{
      try {
        const listProducts=await Product.find()
        const list=listProducts.map(p=>{
            p.email=''
            delete p['email']
            return p          
        })
        return res.json(list)
      } catch (error) {
          console.log(error)
          res.json({status:500,message:error.details[0].message})
      }
    },

    getAllProductByShop:async(req,res)=>{
      try {
        const id=req.params.key
        const listProducts=await Product.find({shopid:id})
        const list=listProducts.map(p=>{
            p.email=''
            delete p['email']
            return p          
        })
        return res.send(list)
      } catch (error) {
          console.log(error)
          res.json({status:500,message:error.details[0].message})
      }  
    },
    getProduct:async(req,res)=>{
      try {
        const _id=req.params.key
        const product=await Product.findOne({_id})
        product.email=''
        delete product['email']
        return res.json(product)

      } catch (error) {
        
      }
    },
}


module.exports=productController