
import { ObjectID } from 'mongodb';
import { DishSandbox  } from '../db-sandbox/models/dish-sandbox'
import { OrderSandbox  } from '../db-sandbox/models/order-sandbox'
import { User } from '../../db/models/users';
import {  Order } from '../../db/models/orders';
import { ChefSandbox } from '../db-sandbox/models/chef-sandbox';
export class ComplexSandbox {


    public static async postOrder(user : Partial<User>, details: Order['details']) {
        const dishes = details.items.map(item => typeof (item.dish) == 'string'? item.dish : item.dish['_id'] );
        const total = await DishSandbox.getPrice(dishes as string[])
        const order: Order = await OrderSandbox.createOrder(user, details, total);
        ChefSandbox.getAll();
        return order;
    }
}



