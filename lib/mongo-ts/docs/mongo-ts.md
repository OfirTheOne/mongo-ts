
# Mongo-TS

### About :
Using decorators located in key positions in a class (represent your mongoose schema, only definitely typed), a 'native' mongoose schema is being build behind the scene, without you repetitively write your schema (once as an interface, class and then a mongoose schema) 

**Using mongo-ts your schema need to be written once as a class - and a typed cover schema will be created for you.**

<br>

### References :
* MongoDB 
* Mongoose
* Typescript

<br>

### Features :

* Generate class definition to a native mongoose schema.
* Support OOP writing style by enabling schema class extending.
* Reduce redundancies by inferring the property type (using reflection).
* Cover created and fetched documents with the schema class definition.
* // Todo : describe class method & static feature.

<br>

### Fallbacks : 

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
