
import { Dish, DishSchema } from '../../../db/models/dishes/'
import { PaginationParams, DishesFilterParams } from '../../..//shared';
import { Types } from 'mongoose';


export class DishSandbox {

   public static get Dish() { return Dish;}


   public static async getAll(page: PaginationParams): Promise<(Partial<DishSchema>)[]> {
      return this.findAllByConditionFields({}, page);
  }

  private static findAllByConditionFields(subObj: {[key: string]: any}, page: PaginationParams){
      const query = Dish
         .find(subObj)
         .lean()
         .populate({ path: 'tags', select: 'name' });
      query.skip(page.skip).limit(page.limit).lean();
      return query.exec();
  }
  
  /**
   * @param page pagination params
   * @param filter filter params
   * @param lightweight indicate if the returned document need to be projected to a shallow copy (for main page)
   */
  public static async filter(page: PaginationParams, filter: DishesFilterParams, lightweight: boolean = true): Promise<(Partial<DishSchema>)[]> {
      const { tags, ingredients, priceLowThen, priceGreatThen } = filter;
      const pipes = [];
      
      // populate tags array and project them as string array
      pipes.push(
         { '$lookup': { from: 'dish_tags', localField: 'tags', foreignField: '_id', as: 'tags'} },
         { '$project': { 
            tags: { $map: { input: '$tags', as: 'tag', in: "$$tag.name" } },
            ingredients: 1, name : 1, price : 1, restaurant : 1, sides : 1, changes: 1 
         } }
      );

      // apply filters params
      tags?             pipes.push({ '$match': { $expr: { $setIsSubset: [ tags, '$tags'] } } }) : undefined;
      ingredients?      pipes.push({ '$match': { $expr: { $setIsSubset: [ ingredients, '$ingredients'] } } } ) : undefined;
      priceLowThen?     pipes.push({ '$match': { price : { $lt: priceLowThen} } }) : undefined;
      priceGreatThen?   pipes.push({ '$match': { price : { $gt: priceGreatThen} } })  : undefined;

      // apply pagination params
      pipes.push({ '$skip' : page.skip }, { '$limit': page.limit });

      const query = Dish.aggregate(pipes);
      return query.exec();    
  }

  public static async getById(id: string): Promise<Partial<DishSchema>> {
      // return 
      const dish = await Dish.findById(id)//.lean()
          .populate({ path: 'tags', select: 'name' })
          .exec();
      const de = dish.getDescription();
      return dish;
  }

   public static async getPrice(dishes: string | string[]) {
      let totalPrice: number;
      if(Array.isArray(dishes)) {
         const dishesId = dishes.map(id =>  Types.ObjectId(id))
         const totalPriceDoc = await Dish.aggregate([
           { $match: { _id: { $in : dishesId } } },
           { $group: { _id: null, totalPrice: { $sum: '$price' } } }
         ]).exec();
         totalPrice = totalPriceDoc[0].totalPrice;
      } else {
         const totalPriceDoc = await Dish.find({_id: dishes}, { price: 1 });
         totalPrice = totalPriceDoc[0].price;
      }
      return totalPrice;
  }

}

