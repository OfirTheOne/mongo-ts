
import { ExtendableMongooseDoc } from '../../../../lib/typed-mongoose/' 
import { TypedSchema, Enum, toModel } from '../../../../lib/typed-mongoose/core'

interface IDishTag { name: 'spicy' | 'vegan' | 'vegetarian' }; 

@TypedSchema()
class DishTagSchema extends ExtendableMongooseDoc implements IDishTag {
    @Enum( ['spicy', 'vegan', 'vegetarian'] ) name: 'spicy' | 'vegan' | 'vegetarian'; 
}

const DishTag = toModel<DishTagSchema>(DishTagSchema, 'dish_tags', (schema) => {
    schema.set('toJSON', { transform: function(doc, ret, option) { return ret; }});
});

export { DishTagSchema, DishTag, IDishTag }
