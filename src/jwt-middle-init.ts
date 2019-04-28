import * as config from 'config';
import { User, UserModel } from './db/models/users';
import { JWTMiddle } from 'jwt-middle';

JWTMiddle.setConfig<User,{ _id: string}>({
    secretProvider: () => config.get('JWT_SECRET'),
    userModel: UserModel,
});
