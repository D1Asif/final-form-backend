import QueryBuilder from "../../builder/QueryBuilder";
import { TProduct } from "./product.interface"
import { Product } from "./product.model"

const createProductIntoDB = async (payload: TProduct) => {
    const newProduct = await Product.create(payload);

    return newProduct;
}

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(Product.find(), query)
        .search(["name", "description"])
        .filter()
        .sort()
        .paginate()
        .fields()

    const products = await productQuery.modelQuery;

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