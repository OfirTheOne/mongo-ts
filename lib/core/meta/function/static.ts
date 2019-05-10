import { MetadataAgent } from '../../../helpers'


/**
 * @description
 *      class method, decorated with '@Static', will be handled as a static model method,
 *      'this' key word will refer to the Model itself, not a specific document.
 * @warn 
 *      using 'this' at compilation time is not reflect the context of the method at run-time.  
 */
function Static() {
    return (targetPrototype: Object, propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor => {
        if(!MetadataAgent.has(targetPrototype, 'isProcessed')) { 
            // take the actual method (decorated by @Static)
            const method = targetPrototype[propertyName]; 
            // insert the method to '$metadata.functions.statics'
            MetadataAgent.set(targetPrototype, [`functions.statics.${propertyName}`, method]) 
        }
        return propertyDesciptor;
    }
}
export { Static  };