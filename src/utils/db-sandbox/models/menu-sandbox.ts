
import { ObjectID } from 'mongodb';
import { Menu, MenuModel } from '../../../db/models/menus'

export class MenuSandbox {

    public static Menu =  MenuModel;  // for seeding

    public static alwaysLean: boolean = true;

    public static getAll() { 
        MenuModel.find({}).lean();
    }
    



}



