"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidations = void 0;
var zod_1 = require("zod");
// Regular expression for validating MongoDB ObjectId
var objectIdRegex = /^[0-9a-fA-F]{24}$/;
// Zod schema for validating order items
var orderItemSchema = zod_1.z.object({
    productId: zod_1.z.string().refine(function (val) { return objectIdRegex.test(val); }, {
        message: "Invalid ObjectId for productId",
    }), // Ensure productId is a valid ObjectId
    quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
});
var createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerName: zod_1.z.string().min(1, "Customer name is required"),
        customerEmail: zod_1.z.string().email("Invalid email address"),
        customerPhone: zod_1.z.string(),
        deliveryAddress: zod_1.z.string().min(1, "Delivery address is required"),
        items: zod_1.z.array(orderItemSchema).min(1, "At least one item is required"),
        paymentMethod: zod_1.z.enum(["Cash on Delivery", "Online Payment"], {
            errorMap: function () { return ({ message: "Invalid payment method" }); }
        }), // Enum for payment methods
        totalPrice: zod_1.z.number().min(0, "Total price must be a positive value"),
        shippingCost: zod_1.z.number().min(0, "Shipping cost must be a positive value"),
    })
});
exports.OrderValidations = {
    createOrderValidationSchema: createOrderValidationSchema
};
