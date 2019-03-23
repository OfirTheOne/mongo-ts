import { MetadataAgent } from '../../../helpers'

export function Property(config: { def: any }) {
    
    return (targetPrototype: Object, propertyName: string): void => {
        if(!MetadataAgent.has(targetPrototype, 'isProcessed')) { 
            MetadataAgent.assign(targetPrototype, [`schemaDefinitions.${propertyName}`, config.def]);
        }
    }
}