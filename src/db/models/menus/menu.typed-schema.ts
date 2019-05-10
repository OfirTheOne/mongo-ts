import { Schema } from 'mongoose';
import { ExtendableMongooseDoc } from '../../../../lib/' 
import { 
    Property, TypedSchema, Ref, ArrayRef, ArrayOf, Prop,
    toModel
} from '../../../../lib/core'


@TypedSchema()
class MenuContent extends ExtendableMongooseDoc {
    @Prop() 
        title: string; 
    @ArrayRef('dishs') 
        dished: Array<Schema.Types.ObjectId | object>; 
    
    // Todo: find a solution for this case
    @Property([ { price: Schema.Types.Number, name: Schema.Types.String } ]) 
        sides: Array<{ price: number; name: string; }>
}

@TypedSchema()
class Menu extends ExtendableMongooseDoc {
    
    @Ref('restaurants') 
        restaurant: object | Schema.Types.ObjectId;

    @ArrayOf(MenuContent)
        content: MenuContent[];
}

const MenuModel = toModel<Menu, typeof Menu>(Menu, 'menus', (schema) => {
    // <-- setting all the hooks here -->
    schema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
});

export { Menu, MenuModel }
