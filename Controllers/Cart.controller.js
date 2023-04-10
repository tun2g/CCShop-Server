const Cart = require("../Models/Cart.model");
const Product = require("../Models/Product.model");

const cartController = {
  //CRUD
  addToCart: async (req, res) => {
    try {
      const { shopid, userid, productid, quantity, cost, size, color } =
        req.body;
      const existedCart = await Cart.findOne({ productid, userid });
      if (!existedCart) {
        const cart = new Cart({
          shopid,
          userid,
          productid,
          quantity,
          cost,
          size,
          color,
        });
        await cart.save();
        res.json({message:"add successfully",status:502});
      } else {
        existedCart.quantity += quantity;
        await existedCart.save();
        res.json({message:"update successfully",status:503});
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteCart: async (req, res) => {
    try {
      const _id = req.params.id;
      await Cart.findOneAndDelete({ _id });
      if (!Cart) {
        res.send("Cart is not exist");
      } else res.send("delete successfully");
    } catch (error) {}
  },
  updateCart: async (req, res) => {
    try {
      const { cost, quantity, _id } = req.body;

      await Cart.findOneAndUpdate(
        { _id },
        { $set: { cost, quantity } },
        {
          new: true,
        }
      );

      res.json({message:"update successfully",status:502});
    } catch (error) {}
  },

  //API
  getCartsByUser: async (req, res) => {
    try {
      const userid = req.params.key;
      
      // get list Carts by user
      const listCarts = await Cart.find({ userid });

      // get list Products id from list Cards
      if (listCarts){
          const listId = listCarts.map((p) => {
            return p.productid;
          });
          //
          // Tìm các sản phẩm có ID nằm trong danh sách
          const list = await Cart.find({
            userid,
            productid: { $in: listId },
          }).populate("productid");
          //
    
          return res.json({ list, amount: parseInt(list.length) });
        
      }
      
    } catch (error) {
      console.log(error);
    }
  },
  getCartsByShop: async (req, res) => {
    try {
      const shopid = req.params.key;
      const listCarts = await Cart.find({ shopid });
      const list = listCarts.map((p) => {
        p.email = "";
        delete p["email"];
        return p;
      });
      return res.json(list);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = cartController;
