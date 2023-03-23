const Product = require('../Models/Product.model')

const productController={
    
  
  //CRUD
    postProduct:async(req,res)=>{
        try {
            const product = new Product({
                name: req.body.name,
                key:req.body.prodkey,
                price: req.body.price,
                quantity: req.body.quantity,
                description: req.body.description,
                imageurl: req.body.file,
                email:req.body.email
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
        const email=req.params.shop
        const listProducts=await Product.find({email})
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
    getProduct:async(req,res)=>{
      try {
        const key=req.params.key
        const product=await Product.findOne({key})
        product.email=''
        delete product['email']
        return res.json(product)

      } catch (error) {
        
      }
    },
}


module.exports=productController