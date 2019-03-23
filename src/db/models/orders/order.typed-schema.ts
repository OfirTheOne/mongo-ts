import { Schema } from 'mongoose';
import { ExtendableMongooseDoc } from '../../../../lib/typed-mongoose/' 
import { 
    Property, TypedSchema, Ref, Number, Default, ArrayOf,
    toModel, toSchema, OnConstructDefinitions
} from '../../../../lib/typed-mongoose/core'
import { IOrder } from './i-order';


@TypedSchema()
class OrderDetailItemSchema extends ExtendableMongooseDoc {
    @Ref('dishes')
        dish: Schema.Types.ObjectId | object;
    @ArrayOf('string')
        sides: string[];
    @ArrayOf('string')
        changes: string[];
}
const OrderDetailItem = toSchema(OrderDetailItemSchema);

@TypedSchema()
class OrderDetailsSchema extends ExtendableMongooseDoc {
    @Ref('restaurants')
        restaurant: Schema.Types.ObjectId | object;
    @Property( { def: { type: [OrderDetailItem]} } )
        items: Array<{ dish: Schema.Types.ObjectId | object; sides: string[]; changes: string[] }>   
}
const OrderDetails = toSchema(OrderDetailsSchema);

@TypedSchema()
class OrderSchema extends ExtendableMongooseDoc implements IOrder, OnConstructDefinitions {

    onConstructDefinitions(schemaDefinitions: object): void {
        console.log(schemaDefinitions);
    }

    @Ref('users')
        user:   Schema.Types.ObjectId | object;
    @Number(false) @Default(Date.now)
        date:   number;
    @Number()     
        total:  number;
    @Property( { def: { type: OrderDetails } } )
        details: { 
            restaurant: Schema.Types.ObjectId | object;
            items: Array<{ dish: Schema.Types.ObjectId | object; sides: string[]; changes: string[] }>
        }
}

const Order = toModel<OrderSchema, typeof OrderSchema>(OrderSchema, 'orders', (schema) => {
    schema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
});

const schema = toSchema(OrderSchema);

export { Order, OrderSchema }
