const { Address } =require("../models/addressmodel")

module.exports.createAddress = async (req, res) => {
    try {
        const { addressId, addressLine1, addressLine2, city, country, pincode, state } = req.body;
       const allAddresses = await Address.find(); // Fetch all existing addresses
       const existingAddress = allAddresses.find(address => address.addressId === addressId);      // Check if an address with the given addressId already exists
        if (existingAddress) {
            return res.status(400).json({success: false,error: "Address with the given ID already exists",existingAddress,
            });
        }
        const newAddress = new Address({
            addressId,
            addressLine1,
            addressLine2,
            city,
            country,
            pincode,
            state,
        });
        const savedAddress = await newAddress.save();
        res.status(200).json({ success: true, message: "Address created successfully", data: savedAddress,
        });
    } catch (error) {
        console.error("Error creating address:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, error: "Validation Error",messages: validationErrors,
            });
        }
        res.status(500).json({ success: false, error: "Internal Server Error",
        });
    }
};

module.exports.getAllAddress = async (req, res) => {
    try {
        // Fetch all addresses from the database
        const allAddresses = await Address.find();
        
        // Respond with the list of addresses
        res.status(200).json({ success: true, data: allAddresses,});
    } catch (error) {
        console.error("Error getting all addresses:", error);
        res.status(500).json({  success: false,  error: "Internal Server Error", });
    }
};

// module.exports.getAddressById = async (req, res) => {
//     try {
//         const addressId = req.params.id; // Assuming the address ID is passed as a route parameter
//         // Check if the provided addressId is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(addressId)) {
//             return res.status(400).json({   success: false,   error: "Invalid Address ID",
//             });
//         }
//         const address = await Address.findById(addressId);
//         // Check if the address with the given ID was not found
//         if (!address) {
//             return res.status(404).json({  success: false,  error: "Address not found",
//             });
//         }
//         res.status(200).json({  success: true,  data: address,
//         });
//     } catch (error) {
//         console.error("Error getting address by ID:", error);
//         res.status(500).json({ success: false, error: "Internal Server Error",
//         });
//     }
// };


module.exports.deleteAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        const deletedAddress = await Address.findOneAndDelete({addressId});
        if (!deletedAddress) {
            return res.status(404).json({
                success: false,
                error: "Address not found",
            });
        }
        res.status(200).json({
            success: true, message: "Address deleted successfully",data: deletedAddress,
        });
    } catch (error) {
        console.error("Error deleting address by ID:", error);
        res.status(500).json({success: false, error: "Internal Server Error",
        });
    }
};

module.exports.updateAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        const updates = req.body;
        // Find the address by its ID and update all fields
        const updatedAddress = await Address.findOneAndUpdate(addressId, updates, {
            new: true, 
            runValidators: true, // Run validators to check for validation errors
        });
        if (!updatedAddress) {
            return res.status(404).json({ success: false,   error: "Address not found",
            });
        }
            res.status(200).json({ success: true, message: "Address updated successfully", data: updatedAddress,
        });
    } catch (error) {
        console.error("Error updating address by ID:", error);
        res.status(500).json({ success: false, error: "Internal Server Error",
        });
    }
};
