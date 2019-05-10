
import { isTypedSchemaClass } from '../../../helpers';
import { PropertyDefinition } from '../../../models/internal';
import { toSchema } from '../../to-schema';
import { handleProvidedType } from './handle-provided-type';
import {createPropertyDecorator} from './create-property-decorator';


// export function DefineProperty(type: any, definition: any = {}) {
    
//     return (targetPrototype: Object, propertyName: string): void => {
//         const name = targetPrototype.constructor.name
//         if(!MetadataAgent.has(targetPrototype, `isProcessed:${name}`)) { 
 
//             MetadataAgent.assign(targetPrototype, [`schemaDefinitions.${propertyName}`, { ...definition, type}]);
            
//         }
//     }
// }


export function Property(type: any, definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('Property',
        (targetPrototype: Object, propertyName: string) => {
            return {
                type: handleProvidedType(type),
                definition
            }
        }
    )
}


