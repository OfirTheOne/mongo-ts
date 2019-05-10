
# Class members Decorators :

Mongo-TS uses field decorators to collect data regard the decorated class members, with that data the member's schema definition is created and mapped to relevant property on the generated schema.


## Api Reference :

`@Prop(definition?: Partial<PropertyDefinition>)`

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



`@Ref(modelName: string, definition?: Partial<PropertyDefinition>)`

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



`@ArrayRef(modelName: string, definition?: Partial<PropertyDefinition>)`

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



`@ArrayOf()`

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



`@Enum(enumKeys: Array<string>, definition?: Partial<PropertyDefinition>)`

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



`@Property(type: any, definition?: Partial<PropertyDefinition>)`

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

`@Default()`

***Description:*** <br>
Decorator that set the default definition to it's provided value. <br>

***Example:*** <br>
```ts
```
<br>



`@Required()`

***Description:*** <br>
Decorator that set the required definition to it's provided value. <br>

***Example:*** <br>
```ts
```
<br>



`@Unique()`

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





