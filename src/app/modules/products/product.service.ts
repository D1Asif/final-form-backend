import { TProduct } from "./product.interface"
import { Product } from "./product.model"

const createProductIntoDB = async (payload: TProduct) => {
    const newProduct = await Product.create(payload);

    return newProduct;
}

const getAllProductsFromDB = async () => {
    const products = await Product.find()

    return products;
}

const getSingleProductFromDB = async (id: string) => {
    const product = await Product.findById(id)

    return product;
}

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        payload,
        { new: true }
    )

    return updatedProduct;
}

const deleteProductFromDB = async (id: string) => {
    const deleteProduct = await Product.findByIdAndDelete(id)

    return deleteProduct;
}

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB
}