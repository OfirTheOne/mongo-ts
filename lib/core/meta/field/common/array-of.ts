import { Schema } from 'mongoose';
import { isTypedSchemaClass } from '../../../../helpers';
import { toSchema } from '../../../to-schema';
import { PropertyDefinition } from '../../../../models/internal';
import { createPropertyDecorator } from '../create-property-decorator';

type SupportedTypes = 'string' | 'number' | 'boolean' | 'any'; // any is mixin

/**
 * @description 
 *  using the standard syntax:  
 *  { type: [{ type: <TYPE>, default: [] }] }
 *  where <TYPE> is the one of Schema.Types.(String | Number | Boolean | Mixed | TypedSchemaClass) 
 * @param type 
 */
export function ArrayOf(type: SupportedTypes | Function, definition: Partial<PropertyDefinition> = {}) {
    
    return createPropertyDecorator('ArrayOf' ,(targetPrototype: Object, propertyName: string) => {
        return {
            type: [{ type: toMatchTypes(type) }],
            definition
        }
    });
}




const toMatchTypes = (type: SupportedTypes | Function) => {
    switch(type) {
        case 'string' :
            return Schema.Types.String;
        case 'number' :
            return Schema.Types.Number;
        case 'boolean' :
            return Schema.Types.Boolean;
        case 'any' :
            return Schema.Types.Mixed;
        default:
            if(isTypedSchemaClass(type)) {
                return toSchema(type as any);
            } else {
                return Schema.Types.Mixed;
            }
    }
} 