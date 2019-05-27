import { TypedSchema, ExtendableMongooseDoc, Prop, Method, Enum, toModel, OnConstructDefinitions } from './../../../../../lib/core'

@TypedSchema()
class Profile extends ExtendableMongooseDoc {
    @Prop() firstName: string;
    @Prop() lastName: string;
    @Prop() address: string;
    @Prop() age: number;
    @Prop() img: string;
}

export { Profile };