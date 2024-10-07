import mongoose from "mongoose";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { Product } from "../products/product.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createOrderIntoDB = async (payload: TOrder) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newOrder = await Order.create([payload], { session });

        for (const item of payload.items) {
            const product = await Product.findById(item.productId).session(session);

            if (!product) {
                throw new AppError(httpStatus.BAD_REQUEST, `Product with ID: ${item.productId} does not exist`)
            }

            if (product.stock < item.quantity) {
                throw new AppError(httpStatus.BAD_REQUEST, `Product with ID: ${item.productId} does not have sufficient stock`)
            }

            product.stock -= item.quantity;

            await product.save({ session })
        }

        await session.commitTransaction()
        session.endSession()

        return newOrder;
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
}

export const OrderServices = {
    createOrderIntoDB
}