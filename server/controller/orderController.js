const { Order } = require("../models/ordermodel");
const { Cart } = require("../models/cartmodel");
const { User } = require("../models/usermodel");
const { Address } = require("../models/addressmodel");

module.exports.createOrder = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { cart, user, shippingPrice, totalPrice, address, title, image } =
      req.body;

    // Basic validation for required fields
    if (!cart || !user || !address) {
      return res.status(400).json({
        success: false,
        message:
          "Cart, user and address information are required to place an order.",
      });
    }
    
    // Find the cart by its ID
    const cartDetails = await Cart.findById(cart);

    // Check if cart exists
    if (!cartDetails) {
      return res.status(404).json({
        success: false,
        message: "Unable to place order because the cart was not found.",
      });
    }

    if (cartDetails.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty. Please add items before ordering.",
      });
    }

    // Retrieve user details
    const userDetails = await User.findById(user);

    // Check if user exists
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User account not found. Please login again.",
      });
    }

    // Retrieve address details
    const addressDetails = await Address.findById(address);

    // Check if address exists
    if (!addressDetails) {
      return res.status(404).json({
        success: false,
        message: "Shipping address not found. Please add a valid address.",
      });
    }

    // Map cart items to order items
    const orderItems = cartDetails.items.map((item) => ({
      // productName: item.productName,
      quantity: item.quantity,
      itemPrice: item.itemPrice,
      title: item.title,
      image: item.image,
    }));

    // Create a new order document using the Order model
    const order = new Order({
      cart: cartDetails,
      user: userDetails,
      address: addressDetails,
      items: orderItems,
      shippingPrice,
      totalPrice,
      title,
      image,
    
    });

    // Save the order document to the database
    await order.save();

    // Respond with a success message
    res
      .status(201)
      .json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    // Handle any errors that occur during order creation
    
    res.status(500).json({
      success: false,
      message: "Something went wrong while placing your order. Please try again later.",
    });
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id; // Retrieve orderId from request parameters

    const order = await Order.findById(orderId).populate("address");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getOrderByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ user: userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: "Cancelled" },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports.removeOrder = async (req, res) => {};

module.exports.updatePaymentStatus = async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({
      status: "error",
      message: "Invalid request: Order ID and status are required",
    });
  }

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    order.paymentInfo = status;
    const updatedOrder = await order.save();

    // If payment completed, clear the associated cart
    if (status === "paid" && order.cart) {
      await Cart.findByIdAndDelete(order.cart);
    }

    res.json({
      status: "success",
      message: "Payment status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

