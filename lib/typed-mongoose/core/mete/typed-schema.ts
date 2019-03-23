import { Ctor } from '../../models/internal';
import { MetadataAgent } from '../../helpers'



export function TypedSchema(config?: { extendsMeta: any }) {

    return <T extends Ctor>(originalConstructor: T) => {
        const original = originalConstructor;
        if(!MetadataAgent.has(original, 'isProcessed')) { 
            if(MetadataAgent.getMeta(original) == undefined) { throw 'Invalid TypedSchema definition.'; }
            if(!MetadataAgent.has(original, 'schemaDefinitions')) { throw 'Invalid TypedSchema definition.'; }
            
            MetadataAgent.set(original, ['schema_config', config]);
            MetadataAgent.set(original, ['isProcessed', true]);    
        }
        return original;
    }
}