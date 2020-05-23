/**
 * routes/home.js - home model
 */

const mongoose = require("mongoose");

/* Model */
const productSchema = new mongoose.Schema({
    filter: { type: String, default: "" },
    family: { type: String, default: "" },
    category: { type: String, default: "" },
    brand: { type: String, default: "" },
    name: { type: String, default: "" },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    message: { type: String, default: "" },
    rate: { type: Number, default: 0 },
    image: [],
    resume: [],
    detail: [],
    description: []
});

/* Export */
module.exports = mongoose.model("products", productSchema)
