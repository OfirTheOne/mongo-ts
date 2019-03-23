import { ObjectID } from 'mongodb';
import { Order, IOrder } from '../../../db/models/orders'
import { UserSchema } from '../../..//db/models/users';

export class OrderSandbox {

    public static Order =  Order;  // for seeding

    public static alwaysLean: boolean = true;

    public static getAll() { 
        Order.find({}).lean();
    }

    public static async createOrder(user: Partial<UserSchema>, orderDetails : IOrder['details'], totalPrice: number): Promise<IOrder> {
        const order: Partial<IOrder> = {
            user: user._id,
            total: totalPrice,
            details: orderDetails,
        }
        const orderDoc = await Order.create(order);
        return orderDoc.toObject() as IOrder;
    }

    public static signIn(user : { password: string, email: string, } ) {
        // return User.(user);
    }
}



