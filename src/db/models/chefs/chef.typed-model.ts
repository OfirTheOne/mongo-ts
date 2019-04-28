import * as mongoose from 'mongoose';
import { ExtendableMongooseDoc } from '../../../../lib/mongo-ts/' 
import { TypedSchema, ArrayRef, toModel, Prop } from '../../../../lib/mongo-ts/core'


@TypedSchema()
class Chef extends ExtendableMongooseDoc {

    @Prop({ required: true }) 
    name: string; 
    @Prop({ required: true })
    about: string;
    @ArrayRef('restaurants')
    restaurants: Array<mongoose.Schema.Types.ObjectId | object>;

}

const ChefModel = toModel<Chef, typeof Chef>(Chef, 'chefs', (chefSchema) => {
    // <-- setting all the hooks here -->
    chefSchema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
    return chefSchema;
});

export { Chef, ChefModel }
