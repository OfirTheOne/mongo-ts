import { Schema } from 'mongoose';
import { ModelDocument } from './../../../ts-coverage';

export interface IOrder /* extends ModelDocument*/ {

    user: Schema.Types.ObjectId | object
    date: number;
    total: number;

    details: {
        restaurant: Schema.Types.ObjectId | object;
        items: { 
            dish: Schema.Types.ObjectId | object;
            sides: Array<string>;
            changes: Array<string>;
            // price: number;
        }[]
    }
}
