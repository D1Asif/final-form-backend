import { z } from "zod";

// Regular expression for validating MongoDB ObjectId
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Zod schema for validating order items
const orderItemSchema = z.object({
    productId: z.string().refine((val) => objectIdRegex.test(val), {
        message: "Invalid ObjectId for productId",
    }), // Ensure productId is a valid ObjectId
    quantity: z.number().min(1, "Quantity must be at least 1"),
});

const createOrderValidationSchema = z.object({
    body: z.object({
        customerName: z.string().min(1, "Customer name is required"),
        customerEmail: z.string().email("Invalid email address"),
        customerPhone: z.string(),
        deliveryAddress: z.string().min(1, "Delivery address is required"),
        items: z.array(orderItemSchema).min(1, "At least one item is required"),
        paymentMethod: z.enum(["Cash on Delivery", "Online Payment"], {
            errorMap: () => ({ message: "Invalid payment method" })
        }), // Enum for payment methods
        totalPrice: z.number().min(0, "Total price must be a positive value"),
        shippingCost: z.number().min(0, "Shipping cost must be a positive value"),
    })
});

export const OrderValidations = {
    createOrderValidationSchema
}