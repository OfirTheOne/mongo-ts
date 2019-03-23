
import { ControllerFunction } from '../../../ts-coverage';
import { DishHandler } from '../handlers/dish.handler';

export class DishController {

    dishHandler = new DishHandler()

    constructor() { }

    filter(): ControllerFunction {
        return (req, res, next) => {
            const {skip, limit} = req.query; 
            const page = { skip: parseInt(skip), limit: parseInt(limit)};
            const { ingredients, tags, priceLt, priceGt } = req.query; 

            this.dishHandler.filter({page, filter: { ingredients, tags, priceLowThen: priceLt, priceGreatThen: priceGt }}, (error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send({ dishes: result });
            });
        }
    }
    
    getById(): ControllerFunction {
        return (req, res, next) => {
            const {id} = req.params; 
            
            this.dishHandler.getById({ id }, (error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send({ dish: result });
            });
        }
    }

    getAll(): ControllerFunction {
        return (req, res, next) => {

            const {skip, limit} = req.query; 
            const page = { skip: parseInt(skip), limit: parseInt(limit)};
            this.dishHandler.getAll({page}, (error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send({ dishes: result });
            });
        }    
    }

}