import * as mongoose from 'mongoose';
import { ExtendableMongooseDoc } from '../../../../lib/typed-mongoose/' 
import { Method, Property, TypedSchema, ArrayRef, Static, toModel } from '../../../../lib/typed-mongoose/core'
import { IChef } from './i-chef';


@TypedSchema()
class ChefSchema extends ExtendableMongooseDoc implements IChef {

    static SomeString = 'helooooooo';
    constructor() { super(); }

    @Property({ def: {type: String,   required: true } } )
    name: string; 
    @Property( {def: { type: String,   required: true } })
    about: string;
    @ArrayRef('restaurants')
    restaurants: Array<mongoose.Schema.Types.ObjectId | object>;


    @Method()
    printId() { console.log(this._id); };

    @Static()
    static getSomeString() { 
        // console.log(this == Chef);   // <-- output true
        // this.SomeString              // <-- on runtime will be undefined
        // _this.SomeString             // <-- yell compile time error (which is good)
        const _this = Chef;             // <-- convention to reference the context of any static method
        console.log('getSomeString');
    };


}

const Chef = toModel<ChefSchema, typeof ChefSchema>(ChefSchema, 'chefs', (chefSchema) => {
    // <-- setting all the hooks here -->
    chefSchema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
    
    return chefSchema;
});

export { ChefSchema, Chef, IChef }
