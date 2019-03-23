import { Schema } from 'mongoose';
import {ModelDocument } from './../../../ts-coverage';

export interface IDish extends ModelDocument {
    name: string;
    description: string;
    price: number;
    ingredients: Array<string>; // Array<Schema.Types.ObjectId | object>;
    tags: Array<Schema.Types.ObjectId | object>;
    restaurant: Schema.Types.ObjectId | object;
    isActive: boolean;
    sides: Array<string>;
    changes: Array<string>;
}
