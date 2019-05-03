import { Schema } from 'mongoose';

import { MetadataAgent, isTypedSchemaClass } from '../../../helpers';
import { InferType } from './../../infer-type'
import { PropertyDefinition } from '../../../models/internal';
import { toSchema } from '../../to-schema';




export function DefineProperty(type: any, definition: any = {}) {
    
    return (targetPrototype: Object, propertyName: string): void => {
        const name = targetPrototype.constructor.name
        if(!MetadataAgent.has(targetPrototype, `isProcessed:${name}`)) { 
 
            MetadataAgent.assign(targetPrototype, [`schemaDefinitions.${propertyName}`, { ...definition, type}]);
            
        }
    }
}


export function Property(type: any, definition: Partial<PropertyDefinition> = {}) {
    let _type = type;

    if(Array.isArray(_type) && _type.length == 1 && isTypedSchemaClass(type[0])) {
        // case where 'type' is array (tuple) of TypedSchemaClass --> must go through toSchema
        _type = [toSchema(type[0])]
    } else if(isTypedSchemaClass(type)) {
        // case where 'type' a TypedSchemaClass --> must go through toSchema
        _type = toSchema(type)
    }
    return DefineProperty(_type, definition);
}



// reflection inferred type 

export function Prop(definition: Partial<PropertyDefinition> = {}){
    return (targetPrototype: Object, propertyName: string): void => {
        const name = targetPrototype.constructor.name
        if(!MetadataAgent.has(targetPrototype, `isProcessed:${name}`)) { 
            const inferredTypeCtor = supportedCtors(InferType(targetPrototype, propertyName));
            MetadataAgent.assign(targetPrototype, [
                `schemaDefinitions.${propertyName}`, 
                { ...definition, type: inferredTypeCtor }
            ]);
        }
    }
}
/*
function isTypedSchemaClass(typeCtor: Function): boolean {
    const name = typeCtor.name;
    return MetadataAgent.has(typeCtor, `isProcessed:${name}`);
}
*/

// map the provided ctors function to the native mongoose ctors
function supportedCtors(typeCtor: Function) {
    const name = typeCtor.name
    switch (name) {
        case 'String':
            return Schema.Types.String
        case 'Number':
            return Schema.Types.Number
        case 'Boolean':
            return Schema.Types.Boolean
        case 'Date':
            return Schema.Types.Date
        case 'Object':
            return Schema.Types.Mixed
        case 'Array':
            return Schema.Types.Array
        default:
            if(isTypedSchemaClass(typeCtor)) {
                return toSchema(typeCtor as any);
            } else {
                throw new Error('Inferred field type not supported, you might want to use @Property instead.');
            }
    }
}