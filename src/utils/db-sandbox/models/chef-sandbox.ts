
import { ObjectID } from 'mongodb';
import { Chef, ChefModel } from '../../../db/models/chefs'

export interface PageOptions { skip: number, limit: number }
export interface SortOptions { by: ('popularity' | 'alfa'), order: 1 | -1 }

export class ChefSandbox {

    public static Chef =  ChefModel;  // for seeding

    public static alwaysLean: boolean = true;

    public static getAll() { 
        ChefModel.find({}).then((docs => {
            console.log(docs[0].about);
        }));
    }
}



