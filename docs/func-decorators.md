
# Schema Static / Class Method Decorator :

**Overview** <br>
Mongo-TS uses method decorators to reference and apply the decorated method (class method or static method) to the document and Model. <br>
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
