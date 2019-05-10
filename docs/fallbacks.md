
## Fallbacks : 

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