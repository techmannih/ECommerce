const mongoose = require('mongoose')


// schemas
const cartSchema = new mongoose.Schema( {
    items: {
      type: [
        {
          productId: {
            type: String,
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity can not be less then 1."],
            default: 1,
          },
        },
      ],
      default: [],
    },
    totalItems: {
        type: Number,
        default: 0,
      },
    totalPrice: {
        type: Number,
        default: 0,
      },
  },

  { timestamps: true } 
);

// models
const Cart = mongoose.model('cart', cartSchema)

module.exports = { Cart }
