
import { ObjectID } from 'mongodb';
import { DishSandbox  } from '../db-sandbox/models/dish-sandbox'
import { OrderSandbox  } from '../db-sandbox/models/order-sandbox'
import { UserSchema } from '../../db/models/users';
import {  IOrder } from '../../db/models/orders';
import { ChefSandbox } from '../db-sandbox/models/chef-sandbox';
export class ComplexSandbox {


    public static async postOrder(user : Partial<UserSchema>, details: IOrder['details']) {
        const dishes = details.items.map(item => typeof (item.dish) == 'string'? item.dish : item.dish['_id'] );
        const total = await DishSandbox.getPrice(dishes as string[])
        const order: IOrder = await OrderSandbox.createOrder(user, details, total);
        ChefSandbox.getAll();
        return order;
    }
}



