import * as mongoose from 'mongoose'
// import { ExtendableMongooseDoc } from "./../extendable-mongoose-doc";
import { toSchema} from './../to-schema';
import { Ctor, SubType } from "../../models/internal";

type PreModelCreationFunc<T> = (scheme: mongoose.Schema<T>) => any; 

export function toModel<M, T extends Ctor<M> = Ctor<M>>(
    TypedSchemeClass: T, 
    modelName: string,
    preModelCreation: PreModelCreationFunc<T> = (schema) => schema): (SubType<T, Function> & mongoose.Model<M & mongoose.Document>) {
    
    const scheme = toSchema(TypedSchemeClass);
    preModelCreation(scheme);
    const model = mongoose.model<M & mongoose.Document>(modelName, scheme);

    return model as (SubType<T, Function> & mongoose.Model<M & mongoose.Document>);
}

