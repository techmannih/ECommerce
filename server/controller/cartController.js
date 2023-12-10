const { Cart} =require("../models/cartmodel")

module.exports.createCart = async (req, res) => {
    try {
        const { cartId } = req.body;
        const existingCart = await Cart.findOne({ cartId });
        if (existingCart) {
            return res.status(200).json({  success: true,  message: "Existing cart found",  data: existingCart,
            });
        }
        const newCart = new Cart({
            cartId,
        });
        const savedCart = await newCart.save();
        res.status(200).json({ success: true,  message: "Cart created successfully",data: savedCart,
        });
    } catch (error) {
        console.error("Error creating or retrieving cart:", error);
        res.status(500).json({success: false,error: "Internal Server Error",
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
        const { cartId, itemId } = req.body;
        // Find the cart by its ID and update the items array using $pull
        const updatedCart = await Cart.findOneAndUpdate(
            cartId,
            {
                $pull: { items: { _id: mongoose.Types.ObjectId(itemId) } },
            },
            { new: true } // Return the updated document
        );
        if (!updatedCart) {
            return res.status(404).json({   success: false,   error: "Cart not found",
            });
        }
        // Recalculate totalItems and totalPrice based on the updated items array
        updatedCart.totalItems = updatedCart.items.reduce((total, item) => total + item.quantity, 0);
        updatedCart.totalPrice = updatedCart.items.reduce((total, item) => total + item.quantity * item.price, 0);
        await updatedCart.save();       // Save the updated cart
        res.status(200).json({ success: true, message: "Item removed from cart successfully", data: updatedCart,
        });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({  success: false,  error: "Internal Server Error",
        });
    }
};

module.exports.clearCart = async (req, res) => {
    try {
        const { cartId } = req.body;
        const cart = await Cart.findOneAndDelete({cartId});
        // Check if the cart exists
        if (!cart) {
            return res.status(404).json({  success: false,  error: "Cart not found",
            });
        }
        // Clear the items array, totalItems, and totalPrice
        cart.items = [];
        cart.totalItems = 0;
        cart.totalPrice = 0;
        const updatedCart = await cart.save();      // Save the updated cart
        res.status(200).json({  success: true, message: "Cart cleared successfully", data: updatedCart,
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ success: false, error: "Internal Server Error",
        });
    }
};
