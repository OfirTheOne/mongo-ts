import * as mongoose from 'mongoose'
import { ExtendableMongooseDoc } from "./../extendable-mongoose-doc";
import { toSchema} from './../to-schema';
import { Ctor, SubType } from "../../models/internal";

type PreModelCreationFunc<T> = (scheme: mongoose.Schema<T>) => any; 

export function toModel<M extends ExtendableMongooseDoc, T extends Ctor<M> = Ctor<M>>(
    TypedSchemeClass: T, 
    modelName: string,
    preModelCreation: PreModelCreationFunc<T> = (schema) => schema): (SubType<T, Function> & mongoose.Model<M>) {
    
    const scheme = toSchema<T, M>(TypedSchemeClass);
    preModelCreation(scheme);
    const model = mongoose.model<M>(modelName, scheme);

    return model as (SubType<T, Function> & mongoose.Model<M>);
}

