const Product = require("../Models/Product.model");

const productController = {
  //CRUD
  postProduct: async (req, res) => {
    try {
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        introduction: req.body.introduction,
        imageurl: req.body.file,
        shopid: req.body.shopid,
      });
      product.save((err, savedProduct) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(savedProduct);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateProduct: async (req, res) => {
    const {_id}=req.body
    try {
      await Product.findOneAndUpdate(
        { _id },
        { $set: req.body },
        {
          new: true,
        }
      );
      res.json({ message: "Cập nhật thành công", status: 500 });
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { _id } = req.body;
      await Product.findOneAndDelete({ _id });

      res.json({
        status: 500,
        message: "Xóa thành công",
      });
    } catch (error) {
      console.log(error);
    }
  },

  //API

  //get all
  getAllProduct: async (req, res) => {
    try {
      const limit = 12;
      const page = req.params.page;
      const skip = (page - 1) * limit;
      const totalNumPosts = await Product.countDocuments();
      const totalPage = Math.ceil(totalNumPosts / limit);
      // Sử dụng aggregation pipeline để phân trang
      const update= await Product.find()
     

      await Product.aggregate([
        { $sort: { updateddAt: -1 } }, // Sắp xếp theo thời gian tạo giảm dần
        { $skip: skip }, // Bỏ qua các bản ghi không cần thiết
        { $limit: limit }, // Giới hạn số lượng bản ghi trả về
      ])
        .then((results) => {
          const list = results.map((p) => {
            p.email = "";
            delete p["email"];
            return p;
          });

          return res.json({ list: list, page: parseInt(totalPage) });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: error.details[0].message });
    }
  },

  // get by shopid
  getAllProductByShop: async (req, res) => {
    try {
      const id = req.params.key;
      const listProducts = await Product.find({ shopid: id });
      const list = listProducts.map((p) => {
        p.email = "";
        delete p["email"];
        return p;
      });
      return res.send(list);
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: error.details[0].message });
    }
  },


  //get one by ID
  getProduct: async (req, res) => {
    try {
      const _id = req.params.key;
      const product = await Product.findOne({ _id });
      product.email = "";
      delete product["email"];
      return res.json(product);
    } catch (error) {}
  },

  //get list by name (search)

  getProductsByName:async(req,res)=>{
    try {
      const key=req.params.key
      const regex= new RegExp(key,'i')
      const listProducts = await Product.find({ name: { $regex: regex } })
      const list = listProducts.map((p) => {
        p.email = "";
        delete p["email"];
        return p;
      });
      if (!listProducts) {
        list=[]
      }
      res.json({status:500,message:"Gửi thành công",list})
    } catch (error) {
      console.log(error)
    }

  },
};

module.exports = productController;
