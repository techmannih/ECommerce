const { Order } = require("../models/ordermodel");

module.exports.createOrder = async (req, res) => {
    try {
        const { orderId, shippingInfo, orderItems, paymentInfo, paidAt, itemsPrice, shippingPrice,totalPrice,  orderStatus,  deliveredAt, } = req.body;
        const newOrder = new Order({  orderId,shippingInfo,  orderItems,  paymentInfo,  paidAt,  itemsPrice,     shippingPrice, totalPrice,  orderStatus, deliveredAt,  });
        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, message: "Order created successfully", data: savedOrder,  });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({  success: false,  error: "Internal Server Error",
        });
    }
};

module.exports.getAllOrder = async (req, res) => {
    try {
        // Fetch all orders from the database
        const allOrders = await Order.find();
        // Respond with the list of orders
        res.status(200).json({ success: true, data: allOrders, });
    } catch (error) {
        console.error("Error getting all orders:", error);
        res.status(500).json({success: false,error: "Internal Server Error",});
    }
};

module.exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            { $set: { orderStatus: "Cancelled", deliveredAt: new Date() } },
            { new: true } // Set this option to true to get the updated document
        );

        // Check if the order exists
        if (!updatedOrder) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }

        // Check if the order is cancellable (add your specific logic here)
        if (updatedOrder.orderStatus === "Cancelled") {
            res.status(200).json({
                success: true,
                message: "Order cancelled successfully",
                data: updatedOrder,
            });
        } else {
            res.status(400).json({
                success: false,
                error: "Order cannot be cancelled in its current state",
            });
        }
    } catch (error) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


