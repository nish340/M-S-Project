const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },

  // basePrice: {  
  //   type: Number,
  //   default: null
  // },
  // perKmPrice: {
  //   type: Number,
  //   default: null
  // },
  // capacity: {
  //   type: Number,
  //   default: null
  // },
  // loadingTime: {
  //   type: Number,
  //   default: null
  // },
  // dimensions: {
  //   type: String,
  //   default: null
  // },
  // status: {
  //   type: Boolean,
  //   default: true
  // },
  // helperStatus: {
  //   type: Boolean,
  //   default: false
  // },
  sequence: {
    type: Number,
    default: null
  }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

