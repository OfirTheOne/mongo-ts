import { Schema } from 'mongoose';
import {ModelDocument } from './../../../ts-coverage';

export interface IChef extends ModelDocument {
    name: string;
    about: string;
    restaurants: Array<Schema.Types.ObjectId | object>;
}
