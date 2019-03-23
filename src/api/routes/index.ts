import { Router } from 'express';
import { userRoutes, dishRoutes, restaurantRoutes } from '../v1/routes'; 


export const apiRoutes = Router().use('/v1', userRoutes, dishRoutes, restaurantRoutes);
export { generalRouter } from './general-routes'