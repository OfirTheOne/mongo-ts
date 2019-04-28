import { ObjectID } from 'mongodb';
import { Order, OrderModel } from '../../../db/models/orders'
import { User } from '../../..//db/models/users';

export class OrderSandbox {

    public static Order =  OrderModel;  // for seeding

    public static alwaysLean: boolean = true;

    public static getAll() { 
        OrderModel.find({}).lean();
    }

    public static async createOrder(user: Partial<User>, orderDetails : Order['details'], totalPrice: number): Promise<Order> {
        const order: Partial<Order> = {
            user: user._id,
            total: totalPrice,
            details: orderDetails,
        }
        const orderDoc = await OrderModel.create(order);
        return orderDoc.toObject() as Order;
    }

    public static signIn(user : { password: string, email: string, } ) {
        // return User.(user);
    }
}



