import { Schema } from 'mongoose';
import { ExtendableMongooseDoc } from '../../../../lib/typed-mongoose/' 
import { 
    Method, TypedSchema, Static, Ref, ArrayRef, String, Number, Boolean, ArrayOf, Default,
    toModel, 
    OnConstructDefinitions
} from '../../../../lib/typed-mongoose/core'
import { IDish } from './i-dish';


@TypedSchema()
class DishSchema extends ExtendableMongooseDoc implements IDish, OnConstructDefinitions  {

    @String()                       
        name: string;
    @String(false)                  
        description: string;
    @Number()                       
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
    @Boolean(false) @Default(true)  
        isActive: boolean;

    constructor() { super(); }

    onConstructDefinitions(schemaDefinitions: object): void {
        console.log(schemaDefinitions);
    }
    
    @Method() printId() { 
        console.log(this._id); 
    };

    @Method() getDescription() { 
        return this.ingredients.join(','); 
    };


    @Static() static getSomeString() { 
        // console.log(this == Dish);   // <-- output true
        // this.SomeString              // <-- on runtime will be undefined
        // _this.SomeString             // <-- yell compile time error (which is good)
        const _this = Dish;             // <-- convention to reference the context of any static method
        console.log('getSomeString');
    };
}

const Dish = toModel<DishSchema, typeof DishSchema>(DishSchema, 'dishes', (schema) => {
    // <-- setting all the hooks here -->
    schema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
});

export { Dish, DishSchema }
