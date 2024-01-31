const { Cart } = require("../models/cartmodel");

module.exports.createCart = async (req, res) => {
  try {
    const {productId,Quantty,itemPrice } = req.body;
    // Check if cartId is provided in the request
    const newCart = await Cart.create({
    productId,Quantty,itemPrice// You can provide default values or adjust as needed
 
    });
    const savedCart = await newCart.save();
    res
      .status(200)
      .json({
        success: true,
        message: "item added in Cart  successfully",
        data: savedCart,
      });
  } catch (error) {
    console.error("Error creating or retrieving cart:", error);

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports.getAllCart = async (req, res) => {
  try {
    // Fetch all shopping carts from the database
    const allCarts = await Cart.find();
    res.status(200).json({ success: true, data: allCarts });
  } catch (error) {
    console.error("Error getting all shopping carts:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
module.exports.removeItemInCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const deletedCart = await Cart.findOneAndDelete({ productId });

    if (deletedCart) {
      res.status(200).json({
        success: true,
        message: "Item removed from cart successfully",
        cart: deletedCart,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports.clearAllCart = async (req, res) => {
  try {
    // Delete all carts
    const result = await Cart.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All Carts cleared successfully",
      data: result, // You can customize the response data as needed
    });
  } catch (error) {
    console.error("Error clearing carts:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
