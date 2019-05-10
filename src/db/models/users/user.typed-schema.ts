import { Schema } from 'mongoose';
import { JWTMiddle } from 'jwt-middle';

import { ExtendableMongooseDoc } from '../../../../lib/'
import { ArrayRef, TypedSchema, toModel, Prop, Method, Static } from '../../../../lib/core'


@TypedSchema()
class UserPersonalData extends ExtendableMongooseDoc {
    @Prop({index: true}) firstName: string;
    @Prop({index: true}) lastName: string;
}

@TypedSchema({ options: { timestamps: true } })
class User extends ExtendableMongooseDoc {
    @Prop({ required: true, unique: true}) email: string;
    @Prop() password: string;
    @Prop() personal: UserPersonalData;
    @ArrayRef('orders') orders: Array<Schema.Types.ObjectId> | Array<Object>;
    @ArrayRef('restaurants') favoriteRestaurants: Array<Schema.Types.ObjectId> | Array<Object>;

    @Method() getEmailAccountProvider() {
        const email = this.email;
        return email.replace(/.+\@(.+)\.[a-z]+$/, '');
    }

    @Static() 
    static async searchByName(searchValue: string) {
        const _this = UserModel;

        const fieldsForSearch = ['personal.firstName', 'personal.lastName'];
        const toPipeLine = ( (s: string) => fieldsForSearch.map(f => ({ [f]: { $regex: searchValue, $options: 'i' } })) );
        
        const searchResult = await _this.aggregate([
            { $text:  {  $search: new RegExp(searchValue) } },
            ... toPipeLine(searchValue)
        ]).exec();

        return searchResult;
    }
}

const UserModel = toModel<User, typeof User>(User, 'users', (schema) => {
    schema.set('toJSON', { transform: function (doc, ret, option) { return ret; } })
    schema.pre<User>('save', JWTMiddle.preSaveHashing('password'));
});

export { UserModel, User }