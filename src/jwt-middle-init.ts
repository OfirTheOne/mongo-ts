import * as config from 'config';
import { IUser, User } from './db/models/users';
import { JWTMiddle } from 'jwt-middle';

JWTMiddle.setConfig<IUser,{ _id: string}>({
    secretProvider: () => config.get('JWT_SECRET'),
    userModel: User,
});
