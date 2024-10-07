import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
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
}, {
    timestamps: true
});

export const Product = model<TProduct>("Product", productSchema)