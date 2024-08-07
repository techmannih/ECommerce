const { Cart } = require("../models/cartmodel");

module.exports.createOrUpdateCart = async (req, res) => {
  try {
    const { userId, productId, quantity, itemPrice, image, title } = req.body;

    console.log("Received userId:", req.body);

    if (!productId || !quantity || !itemPrice || !image || !title) {
      
      console.log("Missing required fields");
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    let cart = await Cart.findOne({ user: userId });
    console.log("cart", cart);

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ user: userId, items: [] });
      console.log("new cart", cart);
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(
      (item) => String(item.productId) === String(productId)
    );
    console.log("existingItem", existingItem);

    if (existingItem) {
      // Increase the quantity of the product and update total item price
      existingItem.quantity += quantity;
      existingItem.totalItemPrice += quantity * itemPrice;
    } else {
      // Product not in the cart, add a new item with initial total item price
      const totalItemPrice = quantity * itemPrice;
      cart.items.push({ productId, quantity, itemPrice, totalItemPrice, image, title});
    }

    const updatedCart = await cart.save();
    console.log("updatedCart", updatedCart);

    res.status(200).json({
      success: true,
      message: existingItem
        ? "Quantity updated in Cart successfully"
        : "Item added to Cart successfully",
      data: updatedCart,
    });
  } catch (error) {
    console.error("Error creating or updating cart:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};




module.exports.DecreaseItem = async (req, res) => {
  try {
    const { productId } = req.body;

    // Find the cart containing the product
    const cart = await Cart.findOne({ "items.productId": productId });

    if (cart) {
      // Decrease the quantity of the product
      const item = cart.items.find((item) => item.productId === productId);
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        // If the quantity is already 1, remove the item from the cart
        cart.items = cart.items.filter((item) => item.productId !== productId);
      }

      const updatedCart = await cart.save();

      res.status(200).json({
        success: true,
        message: "Quantity updated in Cart successfully",
        data: updatedCart,
      });
    } else {
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
    const { userId } = req.params;

    console.log("Received userId:", userId);

    // Check if userId is provided and valid
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is required" });
    }

    // Fetch the cart for the given user ID from the database
    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      return res
        .status(404)
        .json({ success: false, error: "No cart found for the user" });
    }

    console.log("userCart", userCart);

    res.status(200).json({ success: true, data: userCart.items });
  } catch (error) {
    console.error("Error getting all shopping carts:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports.removeItemInCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const updatedCart = await Cart.findOneAndUpdate(
      { "items.productId": productId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (updatedCart && updatedCart.items.length === 0) {
      // If the updated cart is empty, remove it from the database
      await Cart.findByIdAndDelete(updatedCart._id);
      res.status(200).json({
        success: true,
        message: "Item removed from cart successfully and cart is now empty",
      });
    } else if (updatedCart) {
      // If the updated cart still has items, return the updated cart
      res.status(200).json({
        success: true,
        message: "Item removed from cart successfully",
        cart: updatedCart,
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
    await Cart.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All Carts cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing carts:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports.getCartById = async (req, res) => {
  try {
    const { cartId } = req.params;

    // Fetch the cart for the given user ID from the database
    const userCart = await Cart.findById(cartId);

    if (!userCart) {
      return res
        .status(404)
        .json({ success: false, error: "No cart found for the user" });
    }

    console.log("userCart", userCart);

    res.status(200).json({ success: true, data: userCart.items });
  } catch (error) {
    console.error("Error getting all shopping carts:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
