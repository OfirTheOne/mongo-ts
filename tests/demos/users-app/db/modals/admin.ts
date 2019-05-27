import { TypedSchema, ExtendableMongooseDoc, Prop, Method, Enum, toModel, OnConstructDefinitions } from './../../../../../lib/core'
import { Profile } from './profile';

const USER_CAPABILITIES = ['UPDATE', 'DELETE', 'UPDATE_DELETE'];

@TypedSchema()
class BaseUser extends ExtendableMongooseDoc {

    @Prop({ required: true }) name: string;
    @Prop({ unique: true, required: true }) email: string;
    @Prop() profile: Profile;

    @Prop() hash: string;

    @Method() getEmail() {
        return this.email;
    }
}

@TypedSchema()
class Admin extends BaseUser implements OnConstructDefinitions {
    @Prop() role: number;
    @Enum(USER_CAPABILITIES, {default: 'UPDATE'}) capabilities: string[];

    onConstructDefinitions(schemaDefinitions: object, functions?: object): void {
        console.log(JSON.stringify(schemaDefinitions, (k, val) => typeof val == 'function' ? '@function' : val, 2));
    }
}


const AdminModel = toModel<Admin, typeof Admin>(Admin, 'admin', (schema) => {
    schema.pre<Admin>('save', function (next, doc) { 
        
        next();
    })
});

export { AdminModel };