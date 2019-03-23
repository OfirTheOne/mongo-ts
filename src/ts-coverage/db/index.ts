import { ReMap } from '../helpers';
import { SchemaTypeOpts, Schema, SchemaType, SchemaOptions, Document }  from 'mongoose';



export type StrongSchema<M> =  
    ReMap<M, (SchemaTypeOpts<any> | Schema | SchemaType) & {ref: string}>; //{ [key in keyof M]: (SchemaTypeOpts<any> | Schema | SchemaType) & {ref: string} }


/**
 * @description create mongoose scheme from 'schemaBlueprint' & 'options', and assign the 'methods' to the scheme.methods field,
 *  using 'Object.assign' (not override the existing content).
 * 
 * @param schemaBlueprint scheme definition wrapped in 'StrongSchema' interface.
 * @param methods additional model methods
 * @param options mongoose native schema options
 */
export function createStrongSchema<IModel, ModelMethods>(schemaBlueprint: StrongSchema<IModel>, methods: ModelMethods, options?: SchemaOptions):  Schema & { methods: ModelMethods } {
    const schema = new Schema((schemaBlueprint), options);
    schema.methods = Object.assign(schema.methods, methods);
    return schema as Schema & { methods: ModelMethods };
}


export interface ModelDocument extends Document {
    createdAt?: Date; //  timestamps fields
    updatedAt?: Date; //  timestamps fields
}