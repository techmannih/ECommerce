const { Order } = require("../models/ordermodel");
const { Cart } = require("../models/cartmodel");
const { User } = require("../models/usermodel");
const { Address } = require("../models/addressmodel");

module.exports.createOrder = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { cart, user, shippingPrice, totalPrice, address,title, image } =
      req.body;
    // Find the cart by its ID
    const cartDetails = await Cart.findById(cart);

    // Check if cart exists
    if (!cartDetails) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }

    // Retrieve user details
    const userDetails = await User.findById(user);

    // Check if user exists
    if (!userDetails) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Retrieve address details
    const addressDetails = await Address.findById(address);

    // Check if address exists
    if (!addressDetails) {
      return res
        .status(404)
        .json({ success: false, error: "Address not found" });
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
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id; // Retrieve orderId from request parameters

    const order = await Order.findById(orderId).populate("address");

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }


    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports.getOrderByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ user: userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
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
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
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
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

