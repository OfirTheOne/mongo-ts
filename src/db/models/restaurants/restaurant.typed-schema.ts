import { Schema } from 'mongoose';
import { ExtendableMongooseDoc } from '../../../../lib/mongo-ts/' 
import { 
    Method, Property, TypedSchema, Static, ArrayRef, Prop,
    toModel, toSchema, OnConstructDefinitions, Ref 
} from '../../../../lib/mongo-ts/core'
// import { IRestaurant } from './i-restaurant';



@TypedSchema()
class OpenTime extends ExtendableMongooseDoc {
    @Prop({required: true}) open: number;
    @Prop({required: true}) close: number;
}


@TypedSchema()
class WeaklyOpeningTimeSchema extends ExtendableMongooseDoc {
    @Prop() '1':  OpenTime;
    @Prop() '2':  OpenTime;
    @Prop() '3':  OpenTime;
    @Prop() '4':  OpenTime;
    @Prop() '5':  OpenTime;
    @Prop() '6':  OpenTime;
    @Prop() '7':  OpenTime;
}


@TypedSchema()
class Restaurant extends ExtendableMongooseDoc {
    constructor() { super(); }
    
    @Prop({required: true }) 
        name: string;
    @ArrayRef('menus') 
        menus: Array<Schema.Types.ObjectId | object>;
    @Ref('chefs') 
        chef: Schema.Types.ObjectId | object;
    @Prop({required: true })  
        cuisine: string;
    @Prop() 
        openingTime: WeaklyOpeningTimeSchema;
    @Prop({required: true })  
        address: string;
    @Prop({required: true })  
        about: string;
    @Prop({default: true })  
        isActive: boolean;
    

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

}


const RestaurantModel = toModel<Restaurant, typeof Restaurant>(Restaurant, 'restaurants', (schema) => {
    // <-- setting all the hooks here -->
    schema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
});

export { Restaurant, RestaurantModel }
