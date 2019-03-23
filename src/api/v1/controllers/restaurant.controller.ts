
import { ControllerFunction } from '../../../ts-coverage';
import { RestaurantHandler } from '../handlers/restaurant.handler';

export class RestaurantController {

    restaurantHandler = new RestaurantHandler()

    constructor() { }

    filter(): ControllerFunction {
        return (req, res, next) => {
            const {skip, limit} = req.query; 
            const page = { skip: parseInt(skip), limit: parseInt(limit)};
            const { chef, cuisine, openOnly } = req.query; 

            this.restaurantHandler.filter({page, filter: { chef, cuisine, openOnly }}, (error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send({restaurants: result });
            });
        }
    }
    
    getById(): ControllerFunction {
        return (req, res, next) => {
            const {id} = req.params; 
            
            this.restaurantHandler.getById({ id }, (error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send({restaurant: result });
            });
        }
    }

    getAll(): ControllerFunction {
        return (req, res, next) => {

            const {skip, limit} = req.query; 
            const page = { skip: parseInt(skip), limit: parseInt(limit)};
            this.restaurantHandler.getAll({page}, (error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send({ restaurants: result });
            });
        }    
    }

    getCuisines(): ControllerFunction {
        return (req, res, next) => {

            this.restaurantHandler.getCuisines((error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send(result);
            });
        }  
    }

    getSearchCompletion(): ControllerFunction {
        return (req, res, next) => {
            const {search} = req.query;
            const {skip, limit} = req.query; 
            const page = { skip: parseInt(skip), limit: parseInt(limit)};
            this.restaurantHandler.getSearchCompletion({page, search},(error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send(result);
            });
        }  
    }

    patchDeactivateById(): ControllerFunction {
        return (req, res, next) => {
            const {id} = req.params;
            this.restaurantHandler.patchDeactivateById({id},(error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send(result);
            });
        }  
    }

    patchReactivateById(): ControllerFunction {
        return (req, res, next) => {
            const {id} = req.params;
            this.restaurantHandler.patchReactivateById({id},(error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send(result);
            });
        }  
    }
}