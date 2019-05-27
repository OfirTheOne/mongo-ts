import { MetadataAgent } from '../../../helpers'

export function Method() {

    return (targetPrototype: Object, propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor => {
        if(!MetadataAgent.has(targetPrototype, 'isProcessed')) { 
            // take the actual method (decorated by @Method)
            const method = targetPrototype[propertyName];
            // insert the method to '$metadata.functions.methods'
            MetadataAgent.set(targetPrototype, [`functions.methods.${propertyName}`, method]);
        }
        return propertyDesciptor;
    }
}