// import { Schema, model } from 'mongoose';
// import { BoundTo, StrongSchema, createStrongSchema } from './../../../ts-coverage';
// import { IMenu } from './i-menu';


// class MenuMethods {
    /**
     * print this doc _id.
     */
    // printId: BoundTo<IMenuModel> = function() { console.log(this._id); };

    // more methods ...
// }
/*
export interface IMenuModel extends IMenu, MenuMethods { }; 


const MenuSchema = createStrongSchema(({
    restaurant: { type: Schema.Types.ObjectId, ref: 'restaurants' },
    content: { 
        type: [ { 
            title: String, 
            dishes: {type: [{ type: Schema.Types.ObjectId, ref: 'dishes' }] }
        } ] }
} as StrongSchema<IMenu>), new MenuMethods(), { timestamps: true });

MenuSchema.set('toJSON', { transform: function(doc, ret, option) { return ret; }})


export const Menu = model<IMenuModel>('menus', MenuSchema) 


*/