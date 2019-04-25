import { Schema } from 'mongoose';
import { ExtendableMongooseDoc } from '../../../../lib/mongo-ts/' 
import { 
    Method, Property, TypedSchema, Static, ArrayRef,
    toModel, toSchema, OnConstructDefinitions 
} from '../../../../lib/mongo-ts/core'
import { IRestaurant } from './i-restaurant';



@TypedSchema()
class OpenTimeSchema extends ExtendableMongooseDoc {
    @Property( {def: { type: Number, required: true } } ) open: number;
    @Property( { def: { type: Number, required: true } } ) close: number;
}
const OpenTime = toSchema(OpenTimeSchema)


@TypedSchema()
class WeaklyOpeningTimeSchema extends ExtendableMongooseDoc {
    @Property( {def: { type: OpenTime } } ) '1':  { open: number, close: number};
    @Property( {def: { type: OpenTime } } ) '2':  { open: number, close: number};
    @Property( {def: { type: OpenTime } } ) '3':  { open: number, close: number};
    @Property( {def: { type: OpenTime } } ) '4':  { open: number, close: number};
    @Property( {def: { type: OpenTime } } ) '5':  { open: number, close: number};
    @Property( {def: { type: OpenTime } } ) '6':  { open: number, close: number};
    @Property( {def: { type: OpenTime } } ) '7':  { open: number, close: number};
}


@TypedSchema()
class RestaurantSchema extends ExtendableMongooseDoc implements IRestaurant, OnConstructDefinitions {
    onConstructDefinitions(schemaDefinitions: object): void {
        console.log(schemaDefinitions);
    }
    static SomeString = 'helooooooo';
    constructor() { super(); }
    
    @Property( {def: { type: String,   required: true } }) name: string;
    @Property( {def: { type: [{type: Schema.Types.ObjectId, ref: 'menus'}] } }) 
    menus: Array<Schema.Types.ObjectId | object>;
    @Property( {def: { type: Schema.Types.ObjectId, ref: 'chefs'} }) chef: Schema.Types.ObjectId | object;
    @Property( {def: { type: String,   required: true } }) cuisine: string;
    @Property( {def: { type: toSchema(WeaklyOpeningTimeSchema) } } ) 
        openingTime: { [key in 1|2|3|4|5|6|7] : { open: number, close: number} };

    @Property( {def: {  type: String,   required: true } }) address: string;
    @Property( {def: {  type: String,   required: true } }) about: string;
    @Property( {def: { type: Boolean,  default: true } }) isActive: boolean;
    

    @Method()
    isOpen(time: number = Date.now()): boolean { 
        const timeAsHour = new Date(time).getHours();
        const timeAsDay = new Date(time).getDay();
        const {open, close} = this.openingTime[timeAsDay];
        if(open < close) { // open 02 before noon, close 10 before noon
            return open <= timeAsHour && timeAsHour < close;
        } else { // open 17 after noon, close 02 before noon
            return open <= timeAsHour || timeAsHour < close;
        }
    };

    @Static() static getSomeString() { 
        // console.log(this == Restaurant);   // <-- output true
        // this.SomeString              // <-- on runtime will be undefined
        // _this.SomeString             // <-- yell compile time error (which is good)
        const _this = Restaurant;             // <-- convention to reference the context of any static method
        console.log('getSomeString');
    };

}


const Restaurant = toModel<RestaurantSchema, typeof RestaurantSchema>(RestaurantSchema, 'restaurants', (schema) => {
    // <-- setting all the hooks here -->
    schema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
});

export { Restaurant, RestaurantSchema }
