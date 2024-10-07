import { z } from "zod";

const createProductValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"), // Non-empty string
        price: z.number().positive("Price must be greater than 0"), // Positive number
        description: z.string().min(1, "Description is required"), // Non-empty string
        images: z.array(z.string().url("Each image must be a valid URL")), // Array of valid URLs
        category: z.string().min(1, "Category is required"), // Non-empty string
        stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
        tags: z.array(z.string())
    })
})

const updateProductValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required").optional(), // Non-empty string
        price: z.number().positive("Price must be greater than 0").optional(), // Positive number
        description: z.string().min(1, "Description is required").optional(), // Non-empty string
        images: z.array(z.string().url("Each image must be a valid URL")).optional(), // Array of valid URLs
        category: z.string().min(1, "Category is required").optional(), // Non-empty string
        stock: z.number().int().nonnegative("Stock must be a non-negative integer").optional(),
        tags: z.array(z.string()).optional()
    })
})

export const ProductValidations = {
    createProductValidationSchema,
    updateProductValidationSchema
}