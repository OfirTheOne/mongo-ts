
import { HandlerCallback } from '../../../ts-coverage';
import { DbSandbox, ComplexSandbox } from './../../../utils/db-sandbox';
import { User } from 'src/db/models/users';
import { Order } from 'src/db/models/orders';




export class UserHandler {


    signIn(params: {user: User, token: string }, cb: HandlerCallback<{user: Partial<User>, token: String}>) {
        // DbSandbox.users.signIn(params.user)
            // .then( docs => cb(null, docs) )
            // .catch( error => cb(error, null) );
            cb(null, { user: {  ...(params.user.toObject()), password: undefined }, token: params.token })
    }
    signUp(params: {user: Partial<User>}, cb: HandlerCallback<Partial<User>>) {
        DbSandbox.users.signUp(params.user)
            .then( docs => cb(null, docs) )
            .catch( error => cb(error, null) );
    }

    
    order(params: { user: User, orderDetails: Order['details'] }, cb: HandlerCallback<{ order: Partial<Order> }>) {
        ComplexSandbox.postOrder(params.user, params.orderDetails)
        .then(order => cb(null, {order}) )
        .catch( error => cb(error, null) );
    }

    addFavoriteRestaurant(params: { restaurantId: string }, cb: HandlerCallback<Partial<User>>) {
      
    }

    removeFavoriteRestaurant(params: { restaurantId: string }, cb: HandlerCallback<Partial<User>>) {
      
    }
    

}