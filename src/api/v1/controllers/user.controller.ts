
import { ControllerFunction } from '../../../ts-coverage';
import { UserHandler } from '../handlers/user.handler';

export class UserController {

    userHandler = new UserHandler()

    constructor() { }

    signUp(): ControllerFunction {
        return (req, res, next) => {
            const user = req.body['user']
            if(!user) { return next(new Error('failed to insert user.')); } // unnecessary
    
            this.userHandler.signUp({user}, (error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send({ user: result });
            });
        }
    }
    
    signIn(): ControllerFunction {
        return (req, res, next) => {
            const {data} = res.locals;
            const {user, token} = data;
            if(!user || !token) { return next(new Error('failed to authenticate user.')); }
                
            this.userHandler.signIn({user, token}, (error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send({ auth: result });
            });
        }
    }

    postOrder(): ControllerFunction {
        return (req, res, next) => {
            const {data} = res.locals;
            const { user, token } = data;
            if(!user || !token) { return next(new Error('failed to authenticate user.')); }
            const { orderDetails } = req.body;

            this.userHandler.order({ user, orderDetails }, (error, result) => {
                if(error) {
                    return next(error);
                }
                return res.send({ order: result });
            });
        }    
    }

}