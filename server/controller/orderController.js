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
        message: "Cart ID, user ID and address are required to create an order",
      });
    }
    // console.log("Request body:", req.body);
    console.log("order body:", cart);
    // Find the cart by its ID
    const cartDetails = await Cart.findById(cart);
    // console.log("Cart details:", cartDetails);

    // Check if cart exists
    if (!cartDetails) {
      console.log("Cart not found");
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Retrieve user details
    const userDetails = await User.findById(user);
    // console.log("User details:", userDetails);

    // Check if user exists
    if (!userDetails) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Retrieve address details
    const addressDetails = await Address.findById(address);
    // console.log("Address details:", addressDetails);

    // Check if address exists
    if (!addressDetails) {
      console.log("Address not found");
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    // Map cart items to order items
    const orderItems = cartDetails.items.map((item) => ({
      // productName: item.productName,
      quantity: item.quantity,
      itemPrice: item.itemPrice,
      title: item.title,
      image: item.image,
    }));
    // console.log("Order items:", orderItems);

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
    console.log("Order:", order);

    // Save the order document to the database
    await order.save();

    // Respond with a success message
    res
      .status(201)
      .json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    // Handle any errors that occur during order creation
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id; // Retrieve orderId from request parameters
    console.log("Order ID:", orderId);

    const order = await Order.findById(orderId).populate("address");

    if (!order) {
      console.log("Order not found");
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    console.log("Order:", order); // Log the order details

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error getting order by ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getOrderByUserId = async (req, res) => {
  const userId = req.params.userId;
  console.log("userid", userId);
  try {
    console.log(userId);
    const orders = await Order.find({ user: userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error getting orders by user ID:", error);
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
    console.error("Error cancelling order:", error);
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
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { paymentInfo: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    res.json({
      status: "success",
      message: "Payment status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

