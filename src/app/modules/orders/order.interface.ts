import { Types } from "mongoose";

export type TOrder = {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryAddress: string;
    items: {
        productId: Types.ObjectId;
        quantity: number;
    }[];
    paymentMethod: 'Cash on Delivery' | 'Online Payment';
    totalPrice: number;
    shippingCost: number;
}