const { Cart} =require("../models/cartmodel")

module.exports.createCart = async (req, res) => {
    try {
        const { cartId, items, totalItems, totalPrice } = req.body;
        // Check if cartId is provided in the request
        if (!cartId) {
            return res.status(400).json({  success: false,  error: "cartId is required in the request body",
            });
        }
        const existingCart = await Cart.findOne({ çartId: cartId });
        if (existingCart) {
            return res.status(200).json({  success: true,  message: "Existing cart found",  data: existingCart,
            });
        } else {
            const newCart = await Cart.create({
               çartId: cartId,
                items: items || [], // You can provide default values or adjust as needed
                totalItems: totalItems || 0, // Default to 0 if not provided
                totalPrice: totalPrice || 0, // Default to 0 if not provided
            });
            const savedCart = await newCart.save();
            res.status(200).json({   success: true,   message: "Cart created successfully",   data: savedCart,
            });
        }
    } catch (error) {
        console.error("Error creating or retrieving cart:", error);
        // Check if the error is a validation error related to çartId
        if (error.name === 'ValidationError') {
            return res.status(400).json({   success: false,   error: error.message,
            });
        }
        res.status(500).json({  success: false,  error: "Internal Server Error",
        });
    }
};


module.exports.getAllCart = async (req, res) => {
    try {
        // Fetch all shopping carts from the database
        const allCarts = await Cart.find();
        res.status(200).json({  success: true,  data: allCarts,
        });
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
        const { cartId } = req.body.cartId;
        const deletedcart = await Cart.findOneAndDelete({cartId});
        // Check if the cart exists
        if (deletedcart) {
            res.status(200).send({ status: true, message: 'cart deleted successfully', chat: deletedcart });
        } else {
            res.status(404).send({ status: false, message: 'cart not found' });
        }
        // Clear the items array, totalItems, and totalPrice
        // cart.items = [];
        // cart.totalItems = 0;
        // cart.totalPrice = 0;
        // const updatedCart = await cart.save();      // Save the updated cart
        // res.status(200).json({  success: true, message: "Cart cleared successfully", data: updatedCart,
        // });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ success: false, error: "Internal Server Error",
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


