
import { ObjectID } from 'mongodb';
import { Chef } from '../../../db/models/chefs'

export interface PageOptions { skip: number, limit: number }
export interface SortOptions { by: ('popularity' | 'alfa'), order: 1 | -1 }

export class ChefSandbox {

    public static Chef =  Chef;  // for seeding

    public static alwaysLean: boolean = true;

    public static getAll() { 
        Chef.getSomeString();
        Chef.find({}).then((docs => {
            docs[0].printId();
        }));
    }
}



