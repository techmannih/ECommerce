const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
// schemas
const addressSchema = new mongoose.Schema({
    addressLine1: {
      required: true,
      type: String,
    },
    addressLine2: {
      type: String,
    },
    city: {
      required: true,
      type: String,
    },
    country: {
      required: true,
      type: String,
    },
    pincode: {
      required: true,
      type: String,
    },
    state: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }  
);

// models
const Address = mongoose.model('address', addressSchema)

module.exports = { Address }
