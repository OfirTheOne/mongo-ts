import { Router } from 'express'
import { RestaurantController } from '../controllers/restaurant.controller';


const restaurantRoutes = Router();
const restaurantController = new RestaurantController();

restaurantRoutes.get('/restaurant/all', restaurantController.getAll());
restaurantRoutes.get('/restaurant/filter', restaurantController.filter());
restaurantRoutes.get('/restaurant/cuisines', restaurantController.getCuisines());
restaurantRoutes.get('/restaurant/searchcompletion', restaurantController.getSearchCompletion());
restaurantRoutes.get('/restaurant/:id', restaurantController.getById());
restaurantRoutes.patch('/restaurant/:id/deactivate', restaurantController.patchDeactivateById());
restaurantRoutes.patch('/restaurant/:id/reactivate', restaurantController.patchReactivateById());

export { restaurantRoutes };