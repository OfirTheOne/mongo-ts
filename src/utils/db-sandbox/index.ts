

import { ChefSandbox } from './models/chef-sandbox';
import { RestaurantSandbox } from './models/restaurant-sandbox';
import { DishSandbox } from './models/dish-sandbox';
import { MenuSandbox } from './models/menu-sandbox';
import { DishTagModel } from './../../db/models/dish-tags'
import { UserSandbox } from './models/user-sandbox';


export { ComplexSandbox } from './complex-sandbox'
export class DbSandbox {
    static dishTags = {DishTagModel};
    static chefs = ChefSandbox;
    static dishes = DishSandbox;
    static restaurants = RestaurantSandbox;
    static menus = MenuSandbox;
    static users = UserSandbox;



}

