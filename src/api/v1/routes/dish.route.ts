import { Router } from 'express'
import { DishController } from '../controllers/dish.controller';

const dishRoutes = Router();
const dishController = new DishController();


dishRoutes.get('/dish/all', dishController.getAll());
dishRoutes.get('/dish/filter', dishController.filter());
dishRoutes.get('/dish/:id', dishController.getById());


export { dishRoutes };