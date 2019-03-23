
import { Restaurant, RestaurantSchema } from '../../../db/models/restaurants'
import { PaginationParams, RestaurantsFilterParams } from 'src/shared';
import { Types } from 'mongoose';

export interface SortOptions { by: ('popularity' | 'alfa'), order: 1 | -1 }

export class RestaurantSandbox {

    public static get Restaurant() { return Restaurant;}
   
    public static async getAll(page: PaginationParams, lightweight: boolean = true): Promise<(Partial<RestaurantSchema>)[]> {
        return this.findAllByConditionFields({}, page, lightweight);
    }
    
    private static findAllByConditionFields(subObj: {[key: string]: any}, page: PaginationParams, lightweight: boolean = true){
         // lightweight format presented in the front page all full version
        const query = lightweight ? 
            Restaurant.find(subObj, { name: 1, chef: 1 }): 
            Restaurant.find({}); 
        
        query.populate('chef', 'name');
        query.skip(page.skip).limit(page.limit).lean();
        return query.exec();
    }
    
    /**
     * @param page pagination params
     * @param filter filter params
     * @param lightweight indicate if the returned document need to be projected to a shallow copy (for main page)
     */
    public static async filter(page: PaginationParams, filter: RestaurantsFilterParams, lightweight: boolean = true): Promise<(Partial<RestaurantSchema>)[]> {
        const { chef, cuisine, openOnly } = filter;

        const pipes = [];

        // apply filters params
        chef?       pipes.push({ '$match': { chef: new Types.ObjectId(chef) } })      : undefined;
        cuisine?    pipes.push({ '$match': { cuisine } })   : undefined;

        if(openOnly){
            const day = new Date(Date.now()).getDay();
            const hour = new Date(Date.now()).getHours();
            
            pipes.push(
                { '$match': { [`openingTime.${day}`]: { $exists: true } } },
                { '$match': { [`openingTime.${day}.open`]: { $lte: hour }, [`openingTime.${day}.close`] : { $gt: hour } } }
            );
        }

        // apply pagination params & populate 'chef'
        pipes.push(
            { '$skip' : page.skip }, { '$limit': page.limit },
            { '$lookup': {from: 'chefs', localField: 'chef', foreignField: '_id', as: 'chef'} }, 
        );

        // project what is needed
        lightweight? pipes.push({ '$project': { name: true, chef: { name: true, _id: true } } }) : undefined;
        
        const query = Restaurant.aggregate(pipes);
        return query.exec();    
    }

    public static async getById(id: string): Promise<Partial<RestaurantSchema>> {
        return Restaurant.findById(id).lean()
            .populate({ 
                path: 'menus', 
                select: 'content', 
                populate: { 
                    path: 'content.dishes', 
                    select: 'name ingredients price tags',
                    populate: { path: 'tags', select: 'name' } 
                } 
            })
            .lean()
            .exec();
    }

    public static async getCuisines(): Promise<[{cuisines: Array<string>}]> {
        return Restaurant.aggregate([
            { $group : { _id : null , cuisines : { $addToSet: "$cuisine" } } } ,
            { $project: { cuisines: 1 , _id: 0 } } 
        ]).exec()
    }

    public static async searchCompletion(page: PaginationParams, searchText: string) : Promise<{restaurants: string[]}> {
        const regex = new RegExp(`(^|\\s)${searchText}`); 
        return Restaurant.aggregate([
            { $match: { name: { $regex : regex } } },
            { $skip : page.skip }, { $limit: page.limit },
            { $group : { _id : null , restaurants : { $addToSet: "$name" } } } ,
            { $project: { restaurants: 1 , _id: 0 } } 
        ]).exec();
    }

    public static async patchDeactivateById(id: string): Promise<Partial<RestaurantSchema>> {
        return Restaurant.findByIdAndUpdate(id, { isActive: false }, {new: true}).lean().exec();
    }
    public static async patchReactivateById(id: string): Promise<Partial<RestaurantSchema>> {
        return Restaurant.findByIdAndUpdate(id, { isActive: true }, {new: true}).lean().exec();
    }
}

