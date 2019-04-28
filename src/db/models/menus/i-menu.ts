import { Schema } from 'mongoose';
import {ModelDocument } from './../../../ts-coverage';

interface IMenu extends ModelDocument {
    restaurant: Schema.Types.ObjectId | object,
    content: { 
        title: string, 
        dished: Array<Schema.Types.ObjectId | object> 
        sides: [{
            price: number,
            name: string,
        }]
    }[];
}
