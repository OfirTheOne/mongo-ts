
# Schema Class Decorator :

Every schema class must be decorate with `@TypedSchema`, with that, the 'native' schema definition can be provided and a schema class can extends from other schema class.<br>
Class decorated with `@TypedSchema` supports multiple stages / hooks in the schema creation and mapping process, using those hooks you get you can freely change the schema definition as you please.<br>


## Api Reference :

`@TypedSchema(config?: TypedSchemaConfig)`

***Description:*** <br>

***Example:*** <br>
```ts

@TypedSchema()
class Profile extends ExtendableMongooseDoc {
    @Prop() firstName: string;
    @Prop() lastName: string;
    @Prop() address: string;
    @Prop() age: number;
    @Prop() img: string;
}

@TypedSchema({ options: { timestamps: true } })
class User extends ExtendableMongooseDoc {
    @Prop({ required: true }) username: string;
    @Prop({ unique: true, required: true }) email: string;
    @Prop() profile: Profile;
    @Prop() hash: string;

    @Method() getEmail() {
        return this.email;
    }
}

const enumKeys = (eType => (Object.values(eType).filter(e => typeof e == 'string')));
enum Permission { 'delete' ,'update', 'insert' }

@TypedSchema()
class Admin extends User {
    @Prop({ default: 2, max: 4 }) role: number;
    @Enum(enumKeys(Permission), {default: ['update', 'insert']}) 
        permissions: string[];
}
```

```ts
/*  Will be mapped to :  */

Admin = {
    username : { 
        type: Schema.Types.String,
        required: true, 
    },
    email: { 
        type: Schema.Types.String,
        unique: true, 
        required: true, 
    },
    profile: { 
        type: {
            firstName: { type: Schema.Types.String },
            lastName: { type: Schema.Types.String },
            address: { type: Schema.Types.String },
            age: { type: Schema.Types.Number },
            img: { type: Schema.Types.String }
        }
    },
    hash: { type: Schema.Types.String },
    role: {  
        type: Schema.Types.Number,
        default: 2, 
        max: 4, 
    },
    permissions: { 
        type: [Schema.Types.String],
        enum: ['delete' ,'update', 'insert'],
        default: ['insert', 'update']
    }
}
```
<br>


## Schema Creation Hooks

`OnConstructDefinitions` 

***Description:*** <br>
// 

***Definition:*** <br> 
```ts
interface OnConstructDefinitions {
    onConstructDefinitions(schemaDefinitions: object, functions?: object): void
}
```
<br>



`OnSchemaCreated` 

***Description:*** <br>
// 

***Definition:*** <br> 
```ts
interface OnSchemaCreated {
    onSchemaCreated(schema: Schema): void
}
```
<br>



`OnSchemaCached` 

***Description:*** <br>
// 

***Definition:*** <br> 
```ts
interface OnSchemaCached {
    onSchemaCached(schema: Schema): void
}
```
<br>

