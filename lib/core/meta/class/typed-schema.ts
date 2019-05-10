import { Ctor, TypedSchemaConfig } from '../../../models/internal';
import { MetadataAgent } from '../../../helpers'

export function TypedSchema(config?: TypedSchemaConfig) {

    return <T extends Ctor>(originalConstructor: T) => {
        const original = originalConstructor;
        const name = original.name;
        if(!MetadataAgent.has(original, `isProcessed:${name}`)) {

            if(MetadataAgent.getMeta(original) == undefined) { 
                throw 'Invalid TypedSchema definition.'; 
            }
            if(!MetadataAgent.has(original, 'schemaDefinitions')) { 
                throw 'Invalid TypedSchema definition.'; 
            }
            MetadataAgent.set(original, ['schemaConfig', config]);
            MetadataAgent.set(original, [`isProcessed:${name}`, true]);    
        }
        return original;
    }
}

function handleTypeInferProcess(schemaDefinitions: object, fieldsToInfer: object, originalConstructor: Ctor) {
    // InferType 

    Object.keys(fieldsToInfer).forEach(key => {
        const value = fieldsToInfer[key];
        const originalField = originalConstructor

    })
}