
import { HandlerCallback } from '../../../ts-coverage';
import { DbSandbox, ComplexSandbox } from './../../../utils/db-sandbox';
import { UserSchema } from 'src/db/models/users';
import { IOrder } from 'src/db/models/orders';




export class UserHandler {


    signIn(params: {user: UserSchema, token: string }, cb: HandlerCallback<{user: Partial<UserSchema>, token: String}>) {
        // DbSandbox.users.signIn(params.user)
            // .then( docs => cb(null, docs) )
            // .catch( error => cb(error, null) );
            cb(null, { user: {  ...(params.user.toObject()), password: undefined }, token: params.token })
    }
    signUp(params: {user: Partial<UserSchema>}, cb: HandlerCallback<Partial<UserSchema>>) {
        DbSandbox.users.signUp(params.user)
            .then( docs => cb(null, docs) )
            .catch( error => cb(error, null) );
    }

    
    order(params: { user: UserSchema, orderDetails: IOrder['details'] }, cb: HandlerCallback<{ order: Partial<IOrder> }>) {
        ComplexSandbox.postOrder(params.user, params.orderDetails)
        .then(order => cb(null, {order}) )
        .catch( error => cb(error, null) );
    }

    addFavoriteRestaurant(params: { restaurantId: string }, cb: HandlerCallback<Partial<UserSchema>>) {
      
    }

    removeFavoriteRestaurant(params: { restaurantId: string }, cb: HandlerCallback<Partial<UserSchema>>) {
      
    }
    

}