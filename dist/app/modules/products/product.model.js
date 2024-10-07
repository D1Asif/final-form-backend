"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Trims whitespace from the value
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Ensures price is a positive number
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String], // Array of strings for image URLs or paths
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0, // Ensures stock is a non-negative number
    },
    tags: {
        type: [String],
        required: true,
        default: []
    }
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
