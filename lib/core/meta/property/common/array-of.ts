import { Schema } from 'mongoose';
import { DefineProperty } from '../property';
import { isTypedSchemaClass } from '../../../../helpers';
import { toSchema } from '../../../to-schema';
import { PropertyDefinition } from '../../../../models/internal';

type SupportedTypes = 'string' | 'number' | 'boolean' | 'any'; // any is mixin

/**
 * @description 
 *  using the standard syntax:  
 *  { type: [{ type: <TYPE>, default: [] }] }
 *  where <TYPE> is the one of Schema.Types.(String | Number | Boolean | Mixed | TypedSchemaClass) 
 * @param type 
 */
export function ArrayOf(type: SupportedTypes | Function, definition: Partial<PropertyDefinition> = {}) {
    return DefineProperty(
        [{ type: toMatchTypes(type) }], {
        ...definition, 
        ...arrayOfDef()
    });
}

const arrayOfDef = () => ({
    // default: [] 
})



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