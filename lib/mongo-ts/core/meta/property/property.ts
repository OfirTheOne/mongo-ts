import { MetadataAgent } from '../../../helpers';
import { Schema } from 'mongoose';

import { InferType } from './../../infer-type'

export function Property(config: { def: any }) {
    
    return (targetPrototype: Object, propertyName: string): void => {
        const name = targetPrototype.constructor.name
        if(!MetadataAgent.has(targetPrototype, `isProcessed${name}`)) { 
            MetadataAgent.assign(targetPrototype, [`schemaDefinitions.${propertyName}`, config.def]);
        }
    }
}



// reflection inferred type 

export function Prop(config: { def?: any } = {}) {
    return (targetPrototype: Object, propertyName: string): void => {
        const name = targetPrototype.constructor.name
        if(!MetadataAgent.has(targetPrototype, `isProcessed${name}`)) { 
            const inferredTypeCtor = supportedCtors(InferType(targetPrototype, propertyName))
            MetadataAgent.assign(targetPrototype, [
                `schemaDefinitions.${propertyName}`, 
                { ...config.def, type: inferredTypeCtor }
            ]);
        }
    }
}

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
            throw new Error('Inferred field type not supported, you might want to use @Property instead.');
    }
}