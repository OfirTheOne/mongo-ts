import { Schema } from 'mongoose';
import { 
    ExtendableMongooseDoc,
    Method, TypedSchema, Prop, Ref, ArrayRef, ArrayOf,
    toModel, OnConstructDefinitions,
} from '../../../../lib/mongo-ts/core'


@TypedSchema()
class Dish extends ExtendableMongooseDoc  {

    @Prop({required: true})                       
        name: string;
    @Prop()                  
        description: string;
    @Prop()                       
        price: number;
    @ArrayOf('string')              
        ingredients: Array<string>; 
    @ArrayRef('dish_tags')          
        tags: Array<Schema.Types.ObjectId | object>;
    @Ref('restaurants')             
        restaurant: Schema.Types.ObjectId | object;
    @ArrayOf('string')              
        sides: Array<string>;
    @ArrayOf('string')              
        changes: Array<string>;
    @Prop({ default: true })
        isActive: boolean;

    @Method() getDescription() { 
        return this.ingredients.join(','); 
    };

}

const DishModel = toModel<Dish, typeof Dish>(Dish, 'dishes', (schema) => {
    // <-- setting all the hooks here -->
    schema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
});

export { Dish, DishModel }
