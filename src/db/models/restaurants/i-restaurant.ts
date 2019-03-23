import { Schema } from 'mongoose';
import {ModelDocument } from './../../../ts-coverage';

export interface IRestaurant extends ModelDocument {
    name: string;
    menus: Array<Schema.Types.ObjectId | object>;
    chef: Schema.Types.ObjectId | object;
    cuisine: string;
    openingTime: {
        [key in 1|2|3|4|5|6|7] : { open: number, close: number}
    },
    address: string;
    about: string;
    isActive: boolean;

}
