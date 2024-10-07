import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
    customerName: {
        type: String,
        required: true,
        trim: true,  // Trims whitespace
    },
    customerEmail: {
        type: String,
        required: true,
        trim: true
    },
    customerPhone: {
        type: String,
        required: true,
        trim: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
        trim: true,
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId, // Reference to a Product (can be linked to another model)
                required: true,
                ref: 'Product', // Assumes a Product model exists
            },
            quantity: {
                type: Number,
                required: true,
                min: 1, // Ensure quantity is at least 1
            },
        },
    ],
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Cash on Delivery', 'Online Payment'], // Define allowed payment methods
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    shippingCost: {
        type: Number,
        required: true,
    },
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` fields


export const Order = model<TOrder>('Order', orderSchema);