import { ObjectID } from "mongodb";

export type PaginationParams = { skip: number, limit: number };

export type RestaurantsFilterParams = { 
    chef?: string | ObjectID;
    cuisine?: string;
    openOnly?: number
};


export type DishesFilterParams = { 
    priceGreatThen?: number
    priceLowThen?: number
    ingredients?: Array<string>; 
    tags?: Array<ObjectID | string>;
};