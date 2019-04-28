

import { Schema, model } from 'mongoose';
import { BoundTo, StrongSchema, createStrongSchema } from './../../../ts-coverage';
// import { IOrder } from './i-order';


/*
class OrderMethods {

    /**
     * print this doc _id.
     */
    // printId: BoundTo<IOrderModel> = function() { console.log(this._id); };

    // more methods ...
// }

/*
export interface IOrderModel extends IOrder, OrderMethods { }; 

const OrderSchema = createStrongSchema(({
    user:   { type: Schema.Types.ObjectId, ref: 'users'},
    date:   { type: Number, default: Date.now() },
    total:  { type: Number, required: true },
    details: { 
        restaurant: { type: Schema.Types.ObjectId, ref: 'restaurants'},
        items: [{ 
            dish: { type: Schema.Types.ObjectId, ref: 'dishes'},
            sides: { type: [String],  default: [] },
            changes: { type: [String], default: [] },
            // price: { type: Number, required: true },
        }]
    }
} as StrongSchema<IOrder>), new OrderMethods(), { timestamps: true });

OrderSchema.set('toJSON', { transform: function(doc, ret, option) { return ret; }})


export const Order = model<IOrderModel>('orders', OrderSchema);

*/