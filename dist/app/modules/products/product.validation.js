"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
var zod_1 = require("zod");
var createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"), // Non-empty string
        price: zod_1.z.number().positive("Price must be greater than 0"), // Positive number
        description: zod_1.z.string().min(1, "Description is required"), // Non-empty string
        images: zod_1.z.array(zod_1.z.string().url("Each image must be a valid URL")), // Array of valid URLs
        category: zod_1.z.string().min(1, "Category is required"), // Non-empty string
        stock: zod_1.z.number().int().nonnegative("Stock must be a non-negative integer"),
    })
});
var updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(), // Non-empty string
        price: zod_1.z.number().positive("Price must be greater than 0").optional(), // Positive number
        description: zod_1.z.string().min(1, "Description is required").optional(), // Non-empty string
        images: zod_1.z.array(zod_1.z.string().url("Each image must be a valid URL")).optional(), // Array of valid URLs
        category: zod_1.z.string().min(1, "Category is required").optional(), // Non-empty string
        stock: zod_1.z.number().int().nonnegative("Stock must be a non-negative integer").optional(),
    })
});
exports.ProductValidations = {
    createProductValidationSchema: createProductValidationSchema,
    updateProductValidationSchema: updateProductValidationSchema
};
