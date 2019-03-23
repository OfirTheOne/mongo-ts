import { Schema } from 'mongoose';
import { JWTMiddle } from 'jwt-middle';

import { ExtendableMongooseDoc } from '../../../../lib/typed-mongoose/'
import { Property, ArrayRef, TypedSchema, toModel, toSchema, String, Unique } from '../../../../lib/typed-mongoose/core'
import { IUser } from './i-user';


@TypedSchema()
class UserPersonalDataSchema extends ExtendableMongooseDoc {
    @String() firstName: string;
    @String() lastName: string;
}
const UserPersonalData = toSchema(UserPersonalDataSchema);

@TypedSchema()
class UserSchema extends ExtendableMongooseDoc implements IUser {
    @String() @Unique() email: string;
    @String() password: string;
    @Property({ def: { type: UserPersonalData } }) personal: { firstName: string, lastName: string };
    @ArrayRef('orders') orders: Array<Schema.Types.ObjectId> | Array<Object>;
    @ArrayRef('restaurants') favoriteRestaurants: Array<Schema.Types.ObjectId> | Array<Object>;
}

const User = toModel<UserSchema, typeof UserSchema>(UserSchema, 'users', (schema) => {
    schema.set('toJSON', { transform: function (doc, ret, option) { return ret; } })
    schema.pre<UserSchema>('save', JWTMiddle.preSaveHashing('password'));
});

export { UserSchema, User, IUser }