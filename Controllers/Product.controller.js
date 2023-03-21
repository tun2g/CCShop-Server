const Product = require('../Models/Product.model')
const cloudinary=require('../Services/cloudinary')

const productController={
    postProduct:async(req,res)=>{
        try {
            const product = new Product({
                name: req.body.name,
                key:req.body.prodkey,
                price: req.body.price,
                quantity: req.body.quantity,
                description: req.body.description,
                imageurl: req.body.file
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

      
    
}


module.exports=productController