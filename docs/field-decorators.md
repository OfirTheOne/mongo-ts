
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


`@Ref(modelName: string)`

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

`@ArrayRef(modelName: string)`

***Description:*** <br>
Decorator that define an array ref `type` property by a provided modal name. <br>

***Example:*** <br>
```ts
class User ... {
    @ArrayRef('post'); 
        posts: Post[] | ObjectId[]; // assume 'Post' in a defined type / class
    ...
}

/*  Will be mapped to :  */

User = {
    posts: {
        type: [{ ref: 'post' type: Schema.Types.ObjectId }]
    }
    ...
}
```
<br>

```ts
@ArrayOf()
```
<br>

`@Enum(enumKeys: Array<string>, definition?: Partial<PropertyDefinition>)`

***Description:*** <br>
Decorator that define an Enum`type` property by a provided enum keys array. <br>
the property value can be the enum type or an array of that enum, the `Enum` will infer and map the property type accordingly.<br>


***Example:*** <br>
```ts
// helper, take enum type and return his keys as an array.
const enumKeys = (eType => (Object.values(eType).filter(e => typeof e == 'string')));

enum Premonition { 'delete' ,'update', 'insert' }

class User ... {
    @Enum(enumKeys(Premonition), { default: ['insert'] }); 
        premonitions: Premonition[];
    ...
}

/*  Will be mapped to :  */
User = {
    premonitions: {
        type: [String],
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
        type: String,
        enum: ['female' ,'male', 'other'],
        required: true
    }
    ...
}
```
<br>


`@Property(type: any, definition?: Partial<PropertyDefinition>)`
Decorator that allows a free / custom definition of of the decorated property.<br>
Useful in any case that not supported by an out-of-the-box decorator. 



### Restriction

```ts
@Default()
```

```ts
@Required()
```

```ts
@Unique()
```



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





