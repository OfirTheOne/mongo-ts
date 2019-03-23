import { Schema } from 'mongoose';
import { ExtendableMongooseDoc } from '../../../../lib/typed-mongoose/' 
import { 
    Property, TypedSchema, Ref, ArrayRef, String,
    toModel, toSchema
} from '../../../../lib/typed-mongoose/core'
import { IMenu } from './i-menu';


@TypedSchema()
class MenuContentSchema extends ExtendableMongooseDoc {
    @String() 
        title: string; 
    @ArrayRef('dishs') 
        dished: Array<Schema.Types.ObjectId | object>; 
    @Property({ def: { type:  [ { price: Schema.Types.Number, name: Schema.Types.String } ]} })
        sides: Array<{ price: number; name: string; }>
}
const MenuContent = toSchema(MenuContentSchema);

@TypedSchema()
class MenuSchema extends ExtendableMongooseDoc implements IMenu {
    
    @Ref('restaurants') 
        restaurant: object | Schema.Types.ObjectId;

    @Property({ def: { type: [{ type: MenuContent }] } })
        content: { 
            title: string; 
            dished: (object | Schema.Types.ObjectId)[]; 
            sides: [{ price: number; name: string; }]; 
        }[];
}

const Menu = toModel<MenuSchema, typeof MenuSchema>(MenuSchema, 'menus', (schema) => {
    // <-- setting all the hooks here -->
    schema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
});

export { Menu, MenuSchema }
