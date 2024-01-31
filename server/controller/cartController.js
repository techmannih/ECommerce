const { Cart } = require("../models/cartmodel");

module.exports.createOrUpdateCart = async (req, res) => {
  try {
    const { productId, quantity, itemPrice } = req.body;

    // Check if the product is already in the cart
    const existingCartItem = await Cart.findOne({ productId });

    if (existingCartItem) {
      // Product already in the cart, update the quantity and total price
      existingCartItem.quantity += quantity;
      existingCartItem.itemPrice = existingCartItem.quantity * itemPrice;
      const updatedCart = await existingCartItem.save();

      res.status(200).json({
        success: true,
        message: "Quantity updated in Cart successfully",
        data: updatedCart,
      });
    } else {
      // Product not in the cart, add a new entry with calculated total price
      const newCart = await Cart.create({
        productId,
        quantity,
        itemPrice,
      });
      const savedCart = await newCart.save();

      res.status(200).json({
        success: true,
        message: "Item added to Cart successfully",
        data: savedCart,
      });
    }
  } catch (error) {
    console.error("Error creating or updating cart:", error);

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports.IncreaseItem = async (req, res) => {
  try {
    const { productId, quantity, itemPrice } = req.body;

    // Check if the product is already in the cart
    const existingCartItem = await Cart.findOne({ productId });

    if (existingCartItem) {
      // Product already in the cart, update the quantity and total price
      existingCartItem.quantity += quantity;
      existingCartItem.itemPrice = existingCartItem.quantity * itemPrice;
      const updatedCart = await existingCartItem.save();

      res.status(200).json({
        success: true,
        message: "Quantity updated in Cart successfully",
        data: updatedCart,
      });
    } else {
      // Product not in the cart, add a new entry with calculated total price
      const newCart = await Cart.create({
        productId,
        quantity,
        itemPrice,
      });
      const savedCart = await newCart.save();

      res.status(200).json({
        success: true,
        message: "Item added to Cart successfully",
        data: savedCart,
      });
    }
  } catch (error) {
    console.error("Error creating or updating cart:", error);

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
module.exports.DecreaseItem = async (req, res) => {
  try {
    const { productId, quantity, itemPrice } = req.body;

    // Check if the product is already in the cart
    const existingCartItem = await Cart.findOne({ productId });

    if (existingCartItem) {
      // Update the quantity and total price
      existingCartItem.quantity -= quantity;
      existingCartItem.itemPrice -= itemPrice;

      // If the new quantity is less than or equal to 0, remove the item from the cart
      if (existingCartItem.quantity <= 0) {
        await Cart.deleteOne({ productId }); // Use deleteOne to remove the item from the database
        res.status(200).json({
          success: true,
          message: "Item removed from Cart successfully",
        });
      } else {
        const updatedCart = await existingCartItem.save();

        res.status(200).json({
          success: true,
          message: "Quantity updated in Cart successfully",
          data: updatedCart,
        });
      }
    } else {
      // Product not in the cart, handle accordingly (e.g., return an error or ignore)
      res.status(404).json({
        success: false,
        error: "Item not found in the cart",
      });
    }
  } catch (error) {
    console.error("Error updating cart:", error);

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
