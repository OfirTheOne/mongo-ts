
# Class members Decorators :

decorators are used to collect data regard there associated members, with that data the member's schema definition is created and mapped to relevant property on the generated schema.


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

```ts
@Enum()
```


### Custom property definition

```ts
@Property(type: any, definition?: Partial<PropertyDefinition>)
```


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







// instance class method
export { Method } from './method';

// static class method
export { Static } from './static';

// schema class
export { TypedSchema } from './typed-schema';
