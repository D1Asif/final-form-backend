import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (payload: TOrder) => {
    const newOrder = await Order.create(payload);

    return newOrder;
}

export const OrderServices = {
    createOrderIntoDB
}