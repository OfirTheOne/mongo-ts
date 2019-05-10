
# Mongo-TS

### About :
Using decorators located in key positions in a class (represent your mongoose schema, only definitely typed), a 'native' mongoose schema is being build behind the scene, without you repetitively write your schema (once as an interface, class and then a mongoose schema) 

**Using mongo-ts your schema need to be written once as a class - and a typed cover schema will be created for you.**

<br>

### References :
* [MongoDB]('https://docs.mongodb.com/manual/') 
* [Mongoose]('https://mongoosejs.com/docs/guide.html')
* [Typescript]('https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html')

<br>

### Features :

* Generate class definition to a native mongoose schema.
* Support OOP writing style by enabling schema class extending.
* Reduce redundancies by inferring the property type (using reflection).
* Cover created and fetched documents with the schema class definition.
* // Todo : describe class method & static feature.

<br>


### Table Of Content :
+ [Installation](#)
+ [API Reference](#api-reference)
    + [Schema Class Decorator](#schema-class-decorator)
    + [Schema Creation Hooks](#schema-creation-hooks)
    + [Class Members Decorators](#class-members-decorators)
    + [Class Method and Static Decorators](#class-static-and-class-method-decorators)
* [Fallbacks](#fallbacks)
+ [Example Use Cases](#)


<br>
<hr>
<br>

# Installation :
```sh
npm i mongo-ts -S
```
<br>


# Api Reference :


## **Schema Class Decorator :**

**Overview:** <br>
Every schema class must be decorate with `@TypedSchema`, with that, the 'native' schema definition can be provided and a schema class can extends from other schema class.<br>
Class decorated with `@TypedSchema` supports multiple stages / hooks in the schema creation and mapping process, using those hooks you get you can freely change the schema definition as you please.<br>
<br>



### `@TypedSchema(config?: TypedSchemaConfig)`

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



### `interface TypedSchemaConfig`

***Description:*** <br>
An interface ...
***Definition:*** <br> 
```ts

```
<br>
<br>

## **Schema Creation Hooks: **

**Overview:** <br>
The process of generating a 'native' schema from schema-class, is divided to stages :

* first there is a checkup, if a 'native' schema has been generated from that class, if so, its cached and the hook `onSchemaCreated` is called, else, 
* the schema definition is being constructed from the metadata of the class and the hook `onConstructDefinitions` is called.

* after the schema definitions are determent, the 'native' schema is created and the hook `onSchemaCreated` is called, 

* then the 'native' schema object is bound to any static / class method, that was decorated in the schema-class, and the hook `onSchemaBound` is called.

<br>



### `OnConstructDefinitions` 

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



### `OnSchemaCreated` 

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



### `OnSchemaBound` 

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



### `OnSchemaCached` 

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
<br>
<br>


## **Class Members Decorators :**

**Overview:** <br>
Mongo-TS uses field decorators to collect data regard the decorated class members, with that data the member's schema definition is created and mapped to relevant property on the generated schema. <br>
<br>


### `@Prop(definition?: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that infer the type's constructor of the decorated property using reflection, mapped it as the `type` value of the property schema definition. <br>

***Example:*** <br>
```ts
class User ... {
    @Prop({ required: true, unique: true, match: /[a-z0-9]+@[a-z]+\.[a-z]+/ })
        email: string;
    ...
}
/*  Will be mapped to :  */

User = {
    email: { 
        type: Schema.Types.String,
        required: true, 
        unique: true, 
        match: /[a-z0-9]+@[a-z]+\.[a-z]+/ 
    }
    ...
}
```
<br>



### `@Ref(modelName: string, definition?: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that define a ref `type` property by a provided modal name. <br>

***Example:*** <br>
```ts
class User ... {
    @Ref('territory'); 
        territory: Territory | ObjectId; // assume 'Territory' in a defined type / class
    ...
}
/*  Will be mapped to :  */

User = {
    territory: { 
        ref: 'territory'
        type: Schema.Types.ObjectId,
    }
    ...
}
```
<br>



### `@ArrayRef(modelName: string, definition?: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that define an array ref `type` property by a provided modal name. <br>

***Example:*** <br>
```ts
class User ... {
    @ArrayRef('post', { default: [] }); 
        posts: Post[] | ObjectId[]; // assume 'Post' in a defined type / class
    ...
}

/*  Will be mapped to :  */

User = {
    posts: {
        type: [{ ref: 'post' type: Schema.Types.ObjectId }],
        default: []
    }
    ...
}
```
<br>



### `@ArrayOf()`

***Description:*** <br>
Decorator that get one of the string values `string` | `number` | `boolean` | `any` as a type indicator, or a constructor type function of a schema-class (decorated with `@TypedSchema`), and define an array of that type.<br>
An array type field can be inferred using reflection but currently the type of that array can't be detect.<br>

***Example:*** <br>
```ts
class User ... {
    @ArrayOf('string', { default: [] }); 
        tokens: string[],
    ...
}

/*  Will be mapped to :  */

User = {
    tokens: {
        type: [Schema.Types.String],
        default: []
    }
    ...
}
```
<br>



### `@Enum(enumKeys: Array<string>, definition?: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that define an Enum type property by a provided enum keys array. <br>
the property value can be the enum type or an array of that enum, the `Enum` will infer and map the property type accordingly.<br>

***Example:*** <br>
```ts
// helper, take enum type and return his keys as an array.
const enumKeys = (eType => (Object.values(eType).filter(e => typeof e == 'string')));

enum Permission { 'delete' ,'update', 'insert' }

class User ... {
    @Enum(enumKeys(Permission), { default: ['insert'] }); 
        permissions: Permission[];
    ...
}

/*  Will be mapped to :  */
User = {
    permissions: {
        type: [Schema.Types.String],
        enum: ['delete' ,'update', 'insert'],
        default: ['insert']
    }
    ...
}


enum Gender { 'female' ,'male', 'other' }

class Profile ... {
    @Enum(enumKeys(Gender), { required: true }); 
        gender: Gender;
    ...
}

/*  Will be mapped to :  */
Profile = {
    gender: {
        type: Schema.Types.String,
        enum: ['female' ,'male', 'other'],
        required: true
    }
    ...
}
```
<br>



### `@Property(type: any, definition?: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that allows a free / custom definition of of the decorated property.<br>
Useful in any case that not supported by an out-of-the-box decorator. <br>
Note: <br>
In must cases the `@Property` decorator will be used, a duplication of the field type definition will be made, there for a more elegant approach will be to create a separate schema-class of for that field and decorate it with `@Prop`.  

***Example:*** <br>
```ts
@TypedSchema()
class User extends ExtendableMongooseDoc {
    @Prop({ required: true }) username: string;
    @Property({ firstName: String; lastName: String; address: String; age: Number; img: String; }) 
    profile: { firstName: string; lastName: string; address: string; age: number; img: string; }
}

/*  Will be mapped to :  */
User = {
    username: {
        type: String,
    },
    profile: 
        type: {
            firstName: String, 
            lastName: String, 
            address: String,
            age: Number, 
            img: String
        }
    }
    ...
}
```
<br>



### Compositions

Decorator be nature can be compose on top of each other.<br>

### `@Default()`

***Description:*** <br>
Decorator that set the default definition to it's provided value. <br>

***Example:*** <br>
```ts
```
<br>



### `@Required()`

***Description:*** <br>
Decorator that set the required definition to it's provided value. <br>

***Example:*** <br>
```ts
```
<br>



### `@Unique()`

***Description:*** <br>
Decorator that set the unique definition to it's provided value. <br>

***Example:*** <br>
```ts
```
<br>


### Primitives (legacy)

```ts
@String() 
```

```ts
@Number()
```

```ts
@Boolean()
```








## **Class Static and Class Method Decorators :**

**Overview** <br>
dddddddd .. <br>
<br>


### `@Method()`

***Description:*** <br>
Decorator that define a class method as a schema method for any document to use. <br>

***Example:*** <br>
```ts
@TypedSchema({ options: { timestamps: true } })
class User extends ExtendableMongooseDoc {
    @Prop({ required: true }) first: string;
    @Prop({ required: true }) last: string;

    @Method() getFullName() {
        const caps = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        return `${caps(this.first)} ${caps(this.last)}`; 
    } 
}


const UserModel = toModel<User, typeof User>(User, 'users');

UserModel.findById(id).then((user) => {
    console.log(user.getFullName()); // will print the user full name 
});
```
<br>


### `@Static()`

***Description:*** <br>
Decorator that define a static method as a schema method for any model to use. <br>

***Example:*** <br>
```ts
@TypedSchema({ options: { timestamps: true } })
class User extends ExtendableMongooseDoc {
    @Prop({ required: true }) first: string;
    @Prop({ required: true }) last: string;

    @Static() static async searchByName(searchValue: string) {
        const _this = UserModel;

        const fieldsForSearch = ['first', 'last'];
        const toPipeLine = ( 
            (s: string) => 
                fieldsForSearch.map(f => ({ [f]: { $regex: searchValue, $options: 'i' } })) 
        );
        
        const searchResult = await _this.aggregate([ { 
            $or: [
                { $text:  {  $search: new RegExp(searchValue) } },
                ... toPipeLine(searchValue)
            ]
        } ]).exec();

        return searchResult;
    }
}


const UserModel = toModel<User, typeof User>(User, 'users');


// calling this method in a static like syntax - will be supported in compile time as well as run time!
UserModel.searchByName('bob').then((users) => {
    try{
        console.log(users); 
    } catch(e) {
        console.log(e); 
    }
});
```
<br>

***Important !*** <br> 
Document object that been 'leaned' will not be able to invoke any of his bounded class methods, altho, in compile time, the method under the document's type can be access. <br>

```ts
import { TypedSchema, Prop, Method, ExtendableMongooseDoc, toModel } from 'mongo-ts';

@TypedSchema({ options: { timestamps: true } })
class User extends ExtendableMongooseDoc {
    @Prop({ required: true }) username: string;
    @Prop({ unique: true, required: true }) email: string;

    @Method() getEmailAccountProvider() {
        const email = this.email;
        return email.replace(/.+\@(.+)\.[a-z]+$/, '$1');
    }
}

const UserModel = toModel<User, typeof User>(User, 'users');

UserModel.findById(id).lean().then((user) => {
    try{
        console.log(user.getEmailAccountProvider()); // will throw as error.
    } catch(e) {
        console.log(e); // log : "user.getEmailAccountProvider is not a function"
    }
});
```
<br>

*Note:* <br>
If `.lean()` was not chained before the `.then()` than the method `user.getEmailAccountProvider()` would have been called as expected. <br>

<br>

# Fallbacks : 

This module works best with flat schemas (zero redundancies). <br>
The solution for multilayered schema, is to cover each complex (let say, more then three members) layer with a class and use it in the parent layer.<br>


E.g, you could write your class like :

```ts
@TypedSchema()
class BaseUser extends ExtendableMongooseDoc {
    @Prop({ required: true }) name: string;
    @Prop({ unique: true, required: true }) email: string;
    @Prop() hash: string;
    @Property({ firstName: String; lastName: String; address: String; age: Number; img: String; }) 
    profile: { firstName: string; lastName: string; address: string; age: number; img: string; }

    @Method() getEmail() {
        return this.email;
    }
}
```

You can see that there is a repeating definition of the member `profile` - that is the redundancy we aim to loos.<br> 
So by separating this class in to two layers, you can elegantly write it like :

```ts

@TypedSchema()
class Profile extends ExtendableMongooseDoc {
    @Prop() firstName: string;
    @Prop() lastName: string;
    @Prop() address: string;
    @Prop() age: number;
    @Prop() img: string;
}


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


```