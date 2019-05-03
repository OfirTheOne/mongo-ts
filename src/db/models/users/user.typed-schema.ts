import { Schema } from 'mongoose';
import { JWTMiddle } from 'jwt-middle';

import { ExtendableMongooseDoc } from '../../../../lib/'
import { ArrayRef, TypedSchema, toModel, Prop } from '../../../../lib/core'
// import { IUser } from './i-user';


@TypedSchema()
class UserPersonalData extends ExtendableMongooseDoc {
    @Prop() firstName: string;
    @Prop() lastName: string;
}

@TypedSchema({ options: { timestamps: true } })
class User extends ExtendableMongooseDoc {
    @Prop({ required: true, unique: true}) email: string;
    @Prop() password: string;
    @Prop() personal: UserPersonalData;
    @ArrayRef('orders') orders: Array<Schema.Types.ObjectId> | Array<Object>;
    @ArrayRef('restaurants') favoriteRestaurants: Array<Schema.Types.ObjectId> | Array<Object>;
}

const UserModel = toModel<User, typeof User>(User, 'users', (schema) => {
    schema.set('toJSON', { transform: function (doc, ret, option) { return ret; } })
    schema.pre<User>('save', JWTMiddle.preSaveHashing('password'));
});

export { UserModel, User }