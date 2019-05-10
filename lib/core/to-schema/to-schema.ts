import * as mongoose from 'mongoose'
import { MetadataAgent } from "../../helpers";
import { ExtendableMongooseDoc } from "./../extendable-mongoose-doc";
import { Ctor, TypedSchemaConfig } from "../../models/internal";
import { TypedSchemaDecoratorMissingError, EmptyTypedSchemaClassError } from "../../errors";

type SchemaFunctions<T> = { 
    methods?: { [key in keyof  T]: Function }, 
    statics?: { [key in keyof  T]: Function } 
}

export function toSchema<T extends Ctor<M>, M extends mongoose.Document>(TypedSchemaClass: T):  mongoose.Schema<T> {
    
    const $metadata = MetadataAgent.getMeta(TypedSchemaClass);

    // detect if the TypedSchemaClass definition was decorated with @TypedSchema
    const schemaClassName = TypedSchemaClass.name;
    if(!$metadata || !$metadata[`isProcessed:${schemaClassName}`]) { throw new TypedSchemaDecoratorMissingError(); }

    // try to cache schema object if exists, in a case where toSchema was already called of this class
    if(MetadataAgent.has(TypedSchemaClass, 'processedSchemaObject')) {

        // -- hook 03
        /**  OnSchemaCached Stage **/
        const cachedSchema = $metadata['processedSchemaObject'];
        if(typeof TypedSchemaClass.prototype['onSchemaCached'] == 'function') {
            TypedSchemaClass.prototype['onSchemaCached'](cachedSchema);
        }
        return cachedSchema; 
    }

    // if this is the first time calling toSchema
    const { functions, schemaDefinitions, schemaConfig } = $metadata
    if(!schemaDefinitions) { throw new EmptyTypedSchemaClassError(); }
    if(functions && (!functions.statics && !functions.methods)) { /* throw Error */ }

    const config = schemaConfig ? schemaConfig.options : undefined;

    // -- hook 01
    /**  OnConstructDefinitions Stage **/
    if(typeof TypedSchemaClass.prototype['onConstructDefinitions'] == 'function') {
        TypedSchemaClass.prototype['onConstructDefinitions'](schemaDefinitions, functions);
    }

    // create the mongoose scheme object.
    const schema = new mongoose.Schema<T>(schemaDefinitions, config);

    // -- hook 02
    /**  OnSchemaCreated Stage **/
    if(typeof TypedSchemaClass.prototype['onSchemaCreated'] == 'function') {
        TypedSchemaClass.prototype['onSchemaCreated'](schema);
    }

    // assign class method to the schema.
    const boundSchema = assignSchemaFunctions(schema, functions);

    if(typeof TypedSchemaClass.prototype['onSchemaBound'] == 'function') {
        TypedSchemaClass.prototype['onSchemaBound'](schema);
    }
    // set the processed schema object for caching - any future calling of this function.
    MetadataAgent.set(TypedSchemaClass, ['processedSchemaObject', boundSchema])

    return boundSchema;
    
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

