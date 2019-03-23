import { Schema } from 'mongoose';
import { ModelDocument } from './../../../ts-coverage';

export interface IUser extends ModelDocument {

    email: string;
    password: string;

    personal: {
        firstName: string;
        lastName: string;
    }

    favoriteRestaurants: Array<Schema.Types.ObjectId | object>
    orders: Array<Schema.Types.ObjectId | object>

}
