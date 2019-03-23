import * as mongoose from 'mongoose'
import { MetadataAgent } from "../../helpers";
import { ExtendableMongooseDoc } from "./../extendable-mongoose-doc";
import { Ctor } from "../../models/internal";
import { TypedSchemaDecoratorMissingError, EmptyTypedSchemaClassError } from "../../errors";

type SchemaFunctions<T> = { 
    methods?: { [key in keyof  T]: Function }, 
    statics?: { [key in keyof  T]: Function } 
}

export function toSchema<T extends Ctor<M>, M extends ExtendableMongooseDoc>(TypedSchemeClass: T) {
    
    const $metadata = MetadataAgent.getMeta(TypedSchemeClass);
    if(!$metadata || !$metadata.isProcessed) { throw new TypedSchemaDecoratorMissingError(); }
    const { functions, schemaDefinitions } = $metadata
    if(!schemaDefinitions) { throw new EmptyTypedSchemaClassError(); }
    if(functions && (!functions.statics && !functions.methods)) { /* throw Error */ }

    /**  OnConstructDefinitions Stage **/
    if(typeof TypedSchemeClass.prototype['onConstructDefinitions'] == 'function') {
        TypedSchemeClass.prototype['onConstructDefinitions'](schemaDefinitions);
    }

    const schema = new mongoose.Schema<T>(schemaDefinitions)

    /**  OnSchemaCreated Stage **/
    if(typeof TypedSchemeClass.prototype['onSchemaCreated'] == 'function') {
        TypedSchemeClass.prototype['onSchemaCreated'](schema);
    }

    const populatedSchema = assignSchemaFunctions(schema, functions);
    return populatedSchema;
    
}

function assignSchemaFunctions<T>(schema: mongoose.Schema<T>, functions: SchemaFunctions<T> = {}): mongoose.Schema<T> {
    if(functions) {
        functions.methods ? 
            Object.keys(functions.methods).forEach(name => schema.method(name as keyof T, functions.methods[name]) ) : 
            undefined;
        functions.statics ? 
            Object.keys(functions.statics).forEach(name => schema.static(name, functions.statics[name]) ) : 
            undefined;
    }
    return schema;
}

