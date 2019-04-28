
import { ObjectID } from 'mongodb';
import { User, UserModel } from '../../../db/models/users'

export class UserSandbox {

    public static User =  UserModel;  // for seeding

    public static alwaysLean: boolean = true;

    public static getAll() { 
        UserModel.find({}).lean();
    }

    public static async signUp(user : Partial<User> ) {
        const userDoc = await UserModel.create(user);
        
        return { ...(userDoc.toObject()), password: undefined }
    }

    public static signIn(user : { password: string, email: string, } ) {
        // return User.(user);
    }
}



