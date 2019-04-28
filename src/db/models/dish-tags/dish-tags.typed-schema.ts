
import { ExtendableMongooseDoc } from '../../../../lib/mongo-ts/' 
import { TypedSchema, Enum, toModel } from '../../../../lib/mongo-ts/core'

// interface IDishTag { name: 'spicy' | 'vegan' | 'vegetarian' }; 

@TypedSchema()
class DishTag extends ExtendableMongooseDoc {
    @Enum( ['spicy', 'vegan', 'vegetarian'] ) name: 'spicy' | 'vegan' | 'vegetarian'; 
}

const DishTagModel = toModel<DishTag>(DishTag, 'dish_tags', (schema) => {
    schema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
});

export { DishTagModel, DishTag }
