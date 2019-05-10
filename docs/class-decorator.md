
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

`TypedSchemaConfig`



## Schema Creation Hooks

The process of generating a 'native' schema from schema-class, can be divided to stages, 

* first there is a checkup, if a 'native' schema has been generated from that class, if so, its cached and the hook `onSchemaCreated` is called, else, 
* the schema definition is being constructed from the metadata of the class and the hook `onConstructDefinitions` is called.

* after the schema definitions are determent, the 'native' schema is created and the hook `onSchemaCreated` is called, 

* then the 'native' schema object is bound to any static / class method, that was decorated in the schema-class, and the hook `onSchemaBound` is called.

<br>



`OnConstructDefinitions` 

***Description:*** <br>
An interface the schema-class can implement and apply the hook `onConstructDefinitions`.  <br>
`onConstructDefinitions` function executed after the schema definition has been constructed from the schema-class metadata, the schema definition object and decorated static / class methods object is provided as an argument.<br> 

***Definition:*** <br> 
```ts
interface OnConstructDefinitions {
    onConstructDefinitions(schemaDefinitions: object, functions?: object): void
}
```
<br>



`OnSchemaCreated` 

***Description:*** <br>
An interface the schema-class can implement and apply the hook `onSchemaCreated`.  <br>
`onSchemaCreated` function executed after the 'native' schema as created, the new schema object is provided as an argument.<br> 

***Definition:*** <br> 
```ts
interface OnSchemaCreated {
    onSchemaCreated(schema: Schema): void
}
```
<br>



`OnSchemaBound` 

***Description:*** <br>
An interface the schema-class can implement and apply the hook `onSchemaBound`.  <br>
`onSchemaBound` function executed after static / class method, had been bound to the 'native' schema, the bound schema object is provided as an argument.<br> 

***Definition:*** <br> 
```ts
interface OnSchemaBound {
    onSchemaBound(schema: Schema): void
}
```
<br>



`OnSchemaCached` 

***Description:*** <br>
An interface the schema-class can implement and apply the hook `onSchemaCached`.  <br>
`onSchemaCached` function executed only if a 'native' schema has been created from the schema-class (and can be cached), in case the schema can be cached non of the other hooks will ran. <br> 
The cached schema object is provided as an argument.<br> 

***Definition:*** <br> 
```ts
interface OnSchemaCached {
    onSchemaCached(schema: Schema): void
}
```
<br>

