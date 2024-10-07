import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";
import AppError from "../../errors/AppError";

const createProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.createProductIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product successfully created",
        data: result
    })
});

const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProductsFromDB(req.query)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products successfully retrieved",
        data: result
    })
})

const getSingleProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.getSingleProductFromDB(req.params.id)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product successfully retrieved",
        data: result
    })
})

const updateProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.updateProductIntoDB(req.params.id, req.body)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product successfully updated",
        data: result
    })
})

const deleteProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.deleteProductFromDB(req.params.id)

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Product not found!")
    }
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product successfully deleted",
        data: result
    })
})

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}