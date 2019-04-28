
import { HandlerCallback } from '../../../ts-coverage';
import { Dish } from './../../../db/models/dishes'
import { PaginationParams, DishesFilterParams } from './../../../shared' 
import { DbSandbox } from './../../../utils/db-sandbox';

export class DishHandler {


    getAll(params: { page: PaginationParams }, cb: HandlerCallback<Partial<Dish>[]>) {
        DbSandbox.dishes.getAll(params.page)
            .then( docs => cb(null, docs) )
            .catch( error => cb(error, null) );
    }

    
    filter(params: { page: PaginationParams, filter: DishesFilterParams }, cb: HandlerCallback<Partial<Dish>[]>) {
        const { tags, ingredients, priceLowThen, priceGreatThen } = params.filter;

        const filter: DishesFilterParams = { 
            tags: tags ? (Array.isArray(tags)? tags : [tags]) : undefined,
            ingredients: ingredients ? (Array.isArray(ingredients)? ingredients : [ingredients]) : undefined,
            priceLowThen: priceLowThen ? parseInt(`${priceLowThen}`) : undefined,
            priceGreatThen: priceGreatThen ? parseInt(`${priceGreatThen}`) : undefined,
        }
        DbSandbox.dishes.filter(params.page, filter)
            .then( docs => cb(null, docs) )
            .catch( error => cb(error, null) );
    }

    getById(params: {id: string }, cb: HandlerCallback<Partial<Dish>>) {
        DbSandbox.dishes.getById(params.id)
            .then( docs => cb(null, docs) )
            .catch( error => cb(error, null) );
    }
    

}