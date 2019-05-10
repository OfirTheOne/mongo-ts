import { MetadataAgent } from '../../../helpers';
import { getDefaultDefinition } from '../../../field-definition-map';

export function createPropertyDecorator(callerDecorator: string, cb: (targetPrototype: Object, propertyName: string) => {type: any, definition: any}) {
    
    return (targetPrototype: Object, propertyName: string): void => {

        const name = targetPrototype.constructor.name
        if(!MetadataAgent.has(targetPrototype, `isProcessed:${name}`)) { 
            const {type, definition} = cb(targetPrototype, propertyName);

            getDefaultDefinition(propertyName, type, callerDecorator)
            MetadataAgent.assign(targetPrototype, [`schemaDefinitions.${propertyName}`, { ...definition, type}]);
            
        }
    }
}