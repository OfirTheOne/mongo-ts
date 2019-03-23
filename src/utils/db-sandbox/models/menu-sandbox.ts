
import { ObjectID } from 'mongodb';
import { Menu, IMenu } from '../../../db/models/menus'

export class MenuSandbox {

    public static Menu =  Menu;  // for seeding

    public static alwaysLean: boolean = true;

    public static getAll() { 
        Menu.find({}).lean();
    }
    



}



