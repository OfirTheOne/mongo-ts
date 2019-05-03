import * as mongoose from 'mongoose'
import { ExtendableMongooseDoc } from "./../extendable-mongoose-doc";
import { toSchema} from './../to-schema';
import { Ctor, ExtractFunction } from "../../models/internal";

type PreModelCreationFunc<T> = (scheme: mongoose.Schema<T>) => any; 

export function toModel<M extends ExtendableMongooseDoc, T extends Ctor<M> = Ctor<M>>(
    TypedSchemeClass: T, 
    modelName: string,
    preModelCreation: PreModelCreationFunc<T> = (schema) => schema) {
    
    const scheme = toSchema<T, M>(TypedSchemeClass)
    preModelCreation(scheme);
    const model = mongoose.model<M>(modelName, scheme)

    type StaticMethods = ExtractFunction<typeof TypedSchemeClass>

    return model as (StaticMethods & mongoose.Model<M>);
}

