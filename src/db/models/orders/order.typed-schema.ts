import { Schema } from 'mongoose';
import { 
    ExtendableMongooseDoc,
    Property, TypedSchema, Ref, ArrayOf, Prop,
    toModel
} from '../../../../lib/mongo-ts/core'


@TypedSchema()
class OrderDetailItem extends ExtendableMongooseDoc {
    @Ref('dishes')
        dish: Schema.Types.ObjectId | object;
    @ArrayOf('string')
        sides: string[];
    @ArrayOf('string')
        changes: string[];
}

@TypedSchema()
class OrderDetails extends ExtendableMongooseDoc {
    @Ref('restaurants')
        restaurant: Schema.Types.ObjectId | object;
    @Property([OrderDetailItem])
        items: Array<OrderDetailItem>   
}

@TypedSchema()
class Order extends ExtendableMongooseDoc {
    @Ref('users')
        user:   Schema.Types.ObjectId | object;
    @Prop({default: Date.now })
        date:   number;
    @Prop()     
        total:  number;
    @Prop()
        details: OrderDetails
}

const OrderModel = toModel<Order, typeof Order>(Order, 'orders', (schema) => {
    schema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
});

export { OrderModel, Order }
