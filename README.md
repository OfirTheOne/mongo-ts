
# Mongo-TS Struct

### About :
Mongoose Documents, by default, are not covered by there schema type. <br>
The common solution For type-cover Document object, is an interface for each schema, which lead to redundancy (define the schema once as a schema definition object and once as an interface) and may take more code maintenance. <br>

By defining a class that represent your Mongoose schema, and using Typescript decorators around the class's members, your schema definitions are being stored behind the scene and a type-cover 'native' Mongoose schema is created.

**Using mongo-ts your schema need to be written once as a class - and a typed cover schema will be created for you.**

<br>

### References :
* [MongoDB](https://docs.mongodb.com/manual/) 
* [Mongoose](https://mongoosejs.com/docs/guide.html)
* [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

<br>

### Features :

* Generate class definition to a native mongoose schema.
* Support OOP writing style by enabling schema class extending.
* Support class method & static implementation and invoking them through a document and Model.
* Reduce redundancies by inferring the property type (using reflection).
* Cover created and fetched documents with the schema class type definition.

<br>


### Table Of Content :
+ [Installation](#installation)
+ [Quick Setup and Usage](#quick-setup-and-usage)
+ [API Reference](#api-reference)
    + [Schema Class Decorator](#schema-class-decorator)
    + [Schema Creation Hooks](#schema-creation-hooks)
    + [Class Members Decorators](#class-members-decorators)
    + [Class Method and Static Decorators](#class-static-and-class-method-decorators)
    + [Custom Default Schema Definition](#custom-default-schema-definition)
+ [Usage Patterns](#usage-patterns)
    + [Schema Class Extension](#schema-class-extension)
    + [Schema Class Composition](#schema-class-composition)
+ [Fallbacks](#fallbacks)


<br>
<hr>
<br>

# Installation
```sh
npm i mongo-ts-struct -S
```
<br>


# Quick Setup and Usage

1. Assuming you got an existing typescript node app, install the module with `npm i mongo-ts-struct -S`. <br>

    Make sure the setting on your `tsconfig.json` file allowing decorators : <br>
    ```js
    {
        "compilerOptions": {
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true,
            ...
        }
        ...
    }
    ```


2. Moving on to the code, <br>
    The common mongoose schema setup with typescript on the background is looking something like : <br>

    ```ts

    // on file - blog.interface.ts

    export interface IBlog {
            title:  string;
            author: string,
            body:   string,
            comments: { body: string, date: Date }[], 
            date: Date
            hidden: boolean,
            meta: {
                votes: number,
                favs:  number
            }
    }


    // on file - blog.schema.ts

    import * as mongoose from 'mongoose';
    import { IBlog } from './blog.interface';

    export const blogSchema = new mongoose.Schema<IBlog>({
        title:  { 
            type: String, 
            required: true 
        },
        author: String,
        body:   String,
        comments: { 
            type: [{ body: String, date: Date }], 
            default: [] 
        },
        date: { type: Date, default: Date.now },
        hidden: Boolean,
        meta: {
            votes: Number,
            favs:  Number
        }
    });


    // on file - blog.model.ts

    import * as mongoose from 'mongoose';
    import { blogSchema } from './blog.schema';

    blogSchema.methods.recentComments = function(amount: number = 5) {
        const blog = this;
        return blog.comments.sort((a, b) => a - b > 0 ? 1 : -1 ).slice(0, amount);
    }

    export const Blog =  mongoose.Model('blogs', blogSchema);

    ```
    <br>

    **The down falls on this approach :** <br>
    * You got three files for a single schema, you can place it all in one file, but that might be consider a bad practice. <br>
    * The redundancy and duplicate definition of your schema are very match noticeable.<br> 
    Maintaining two definitions located in separate files in sync can cause some hide-of-sight bugs. <br>
    * A method defined with `schema.methods` will not be type covered, meaning, the calling of the method will not be supported by typescript compiler.  <br>


    This approach can be reduce now to the following, while avoiding all the mentioned fall becks. <br>

    The interface definition, mongoose-schema and schema-functions are all located under the same roof of a single class, just like the familiar OOP coding style.<br>
    ```ts
    // on file - blog.ts  / a single file will suffice

    import { TypedSchema, Prop, Property, ArrayOf, Method ,toModel } from 'mongo-ts-struct';

    @TypedSchema() class BlogComments {
        @Prop() body: string;
        @Prop() date: Date;
    }

    @TypedSchema() class Blog extends ExtendableMongooseDoc {

        @Prop({ required: true }) title: string;
        @Prop() author: string;
        @Prop() body: string;
        // can use @Property instead of creating comments schema.
        @ArrayOf(BlogComments, { default: [] }) comments: BlogComments[];  
        @Prop({ default: Date.now }) date: Date;
        @Prop() hidden: boolean;

        @Property(votes: Number, favs:  Number}) 
            meta: {
                votes: number,
                favs:  number
            }

        @Method() recentComments(amount: number = 5) {
            return this.comments.sort((a, b) => a - b > 0 ? 1 : -1 ).slice(0, amount);
        }
    }

    export const BlogModel = toModel<Blog, typeof Blog>(Blog, 'blogs');

    ```

3. The data queries are all remain the same, the returned documents are cover with the schema-class type, and the schema-class method can be invoked by the returned documents as well;

    ```ts
    async function getBlog(id: string): Promise<{ blog: Blog, recentComments: Array<BlogComments> }> {
        const blogDoc = await BlogModel.findById(id); // blogDoc of Blog type
        const recentComments = blog.recentComments(); // recentComments of BlogComments[] type 
        return { blog: blogDoc, recentComments };
    }
    ```

<br>
<br>
<br>

# Api Reference


## **Schema Class Decorator**

**Overview:** <br>
Every schema class must be decorate with `@TypedSchema`. 
With that, the schema definitions can be collected (using field decorators) from the class, and the schema-class extending can be supported and work properly.<br>
Class decorated with `@TypedSchema` supports multiple function-hooks (stages) in the schema creation, using those hooks you can make your custom changes the schema creation process as you please.<br>
<br>



#### `@TypedSchema(config?: TypedSchemaConfig)`

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



#### `interface TypedSchemaConfig`

***Description:*** <br>
::TODO:: <br>
***Definition:*** <br> 
```ts
::TODO::
```
<br>


#### `toModel<M, T extends Ctor<M>>(class: T, modelName: string, transform: PreModelCreationFunc<T>)`

***Description:*** <br>
Function that process your schema-class object to a type cover mongoose Model. <br>
Querying documents using the `Model` created with `toModel<M, T extends Ctor<M>>` will return documents of type `M`, <br>
where `M` will be the schema-class object. 

***Usage:*** <br> 
```ts
import { ExtendableMongooseDoc, Method } from 'mongo-ts-struct'
import { TypedSchema, toModel, Prop } from 'mongo-ts-struct'


@TypedSchema({ options: { timestamps: true } })
class User extends ExtendableMongooseDoc {
    @Prop({ required: true, unique: true}) email: string;
    @Prop() password: string;

    @Method() getEmailAccountProvider() {
        const email = this.email;
        return email.replace(/.+\@(.+)\.[a-z]+$/, '$1');
    }
}

const UserModel = toModel<User, typeof User>(User, 'users', (schema) => {
    schema.set('toJSON', { 
        transform: function (doc, ret, option) { 
            return ret; 
        }
    });
    schema.pre('save', /*  some password hashing action ...  */);
});

export { UserModel, User }

```
<br>



<br>

## **Schema Creation Hooks**

**Overview:** <br>
The process of generating a 'native' schema from schema-class, is divided to stages :

* first there is a checkup, if a 'native' schema has been generated from that class, if so, its cached and the hook `onSchemaCreated` is called, else, 
* the schema definition is being constructed from the metadata of the class and the hook `onConstructDefinitions` is called.

* after the schema definitions are determent, the 'native' schema is created and the hook `onSchemaCreated` is called, 

* then the 'native' schema object is bound to any static / class method, that was decorated in the schema-class, and the hook `onSchemaBound` is called.

<br>



#### `OnConstructDefinitions` 

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



#### `OnSchemaCreated` 

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



#### `OnSchemaBound` 

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



#### `OnSchemaCached` 

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


## **Class Members Decorators**

**Overview:** <br>
Mongo-TS uses field decorators to collect data regard the decorated class members, with that data the member's schema definition is created and mapped to relevant property on the generated schema. <br>
<br>


#### `@Prop(definition?: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that infer the type's constructor of the decorated property using reflection, mapped it as the `type` value of the property schema definition. <br>

***Example:*** <br>
```ts
@Prop({ required: true, unique: true, match: /[a-z0-9]+@[a-z]+\.[a-z]+/ })
    email: string;

/*  Will be mapped to :  */

email: { 
    type: Schema.Types.String,
    required: true, 
    unique: true, 
    match: /[a-z0-9]+@[a-z]+\.[a-z]+/ 
}

```
<br>



#### `@Ref(modelName: string, definition?: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that define a ref `type` property by a provided modal name. <br>

***Example:*** <br>
```ts
@Ref('territory'); 
    territory: Territory | ObjectId; // assume 'Territory' in a defined type / class

/*  Will be mapped to :  */

territory: { 
    ref: 'territory'
    type: Schema.Types.ObjectId,
}
```
<br>



#### `@ArrayRef(modelName: string, definition?: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that define an array ref `type` property by a provided modal name. <br>

***Example:*** <br>
```ts
@ArrayRef('post', { default: [] }); 
    posts: Post[] | ObjectId[]; // assume 'Post' in a defined type / class

/*  Will be mapped to :  */

posts: {
    type: [{ ref: 'post' type: Schema.Types.ObjectId }],
    default: []
}
```
<br>



#### `@ArrayOf(type: SupportedTypes | Function, definition: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that get `SupportedTypes` (one of the string values `string` | `number` | `boolean` | `any`) as a type indicator, or a constructor type function of a schema-class (decorated with `@TypedSchema`), and define an array of that type.<br>
An array type field can be inferred using reflection but currently the type of that array can't be detect.<br>

***Example:*** <br>
```ts
@ArrayOf('string', { default: [] }); 
    tokens: string[],

/*  Will be mapped to :  */

tokens: {
    type: [Schema.Types.String],
    default: []
}

```
<br>



#### `@Enum(enumKeys: Array<string>, definition?: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that define an Enum type property by a provided enum keys array (an array of string). <br>
The property type can be the enum type or an array of that enum, the `@Enum` will infer and map the property type accordingly.<br>

***Example:*** <br>
```ts
// helper, take enum type and return his keys as an array.
const enumKeys = (eType => Object.values(eType));
enum Permission { DELETE = 'delete' , update = 'update', INSERT = 'insert' }

@Enum(enumKeys(Permission), { default: [Permission.INSERT] }); 
    permissions: Permission[];

/*  Will be mapped to :  */

permissions: {
    type: [Schema.Types.String],
    enum: ['delete' ,'update', 'insert'],
    default: ['insert']
}


enum Gender { 'female' ,'male', 'other' }

@Enum(enumKeys(Gender), { required: true }); 
    gender: Gender;

/*  Will be mapped to :  */

gender: {
    type: Schema.Types.String,
    enum: ['female' ,'male', 'other'],
    required: true
}

```
<br>



#### `@Property(type: any, definition?: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that allows a free / custom definition of of the decorated property.<br>
Useful in any case that not supported by an out-of-the-box decorator. <br>
Note: <br>
In must cases the `@Property` decorator will be used, a duplication of the field type definition will be made, there for a more elegant approach will be to create a separate schema-class of for that field and decorate it with `@Prop`.  

***Example:*** <br>
```ts
@Property({ firstName: String; lastName: String; address: String; age: Number; img: String; }) 
    profile: { firstName: string; lastName: string; address: string; age: number; img: string; }


/*  Will be mapped to :  */
profile: {
    type: {
        firstName: String, 
        lastName: String, 
        address: String,
        age: Number, 
        img: String
    }
}
```
<br>



### **Compositions**

Decorators by nature can be compose on top of each other, with decorator that set a specific definition attribute it can make more sense to utilize that behaviors.<br> 
An option for setting a class member's definition can be by composing specific-attribute decorators.<br>
<br>

#### `@Default(value: boolean = true)`

***Description:*** <br>
Decorator that set the `default` definition attribute to the provided value. <br>

***Example:*** <br>
```ts
@TypedSchema()
class User extends ExtendableMongooseDoc {  
    @Prop() 
    @Default(true)  
        subscribed: boolean;
}
```
<br>



#### `@Required(value: (boolean | string) = true)`

***Description:*** <br>
Decorator that set the `required` definition attribute to the provided value. <br>

***Example:*** <br>
```ts 
@Prop() 
@Required()  
    email: string;

```
<br>



#### `@Unique(value: boolean = true)`

***Description:*** <br>
Decorator that set the `unique` definition attribute to the provided value. <br>

***Example:*** <br>
```ts

@Prop() 
@Unique()  
    email: string;

```
<br>


#### `@Match(value: RegExp | string)`

***Description:*** <br>
Decorator that set the `match` definition attribute to the provided value. <br>

***Example:*** <br>
```ts

    @Prop() 
    @Match(/^[\w\.-]+@[\w-]+\.[\w\.-]+$/) 
        email: string;

```

<br>
<br>
<br>




## **Static & Class Method Decorators**

**Overview** <br>
Mongo-TS uses method decorators to reference and apply the decorated method (class method or static method) to the document and Model. <br>
<br>


#### `@Method()`

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


#### `@Static()`

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
If `.lean()` was not chained before the `.then()`, then the method `user.getEmailAccountProvider()` would have been called as expected. <br>

<br>
<br>
<br>


## **Custom Default Schema Definition**

**Overview** <br>
::TODO:: <br>

<br>
<br>
<br>



# Usage Patterns

## Schema Class Extension

```ts

```
<br>
<br>
<br>


## Schema Class Composition

```ts

```
<br>
<br>
<br>



# Fallbacks

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