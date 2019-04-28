import { Schema } from 'mongoose';
import { DefineProperty } from '../property';
import { isTypedSchemaClass } from '../../../../helpers';
import { toSchema } from '../../../to-schema';

type SupportedTypes = 'string' | 'number' | 'boolean' | 'any'; // any is mixin

/**
 * @description 
 *  using the standard syntax:  
 *  { type: [{ type: <TYPE>, default: [] }] }
 *  where <TYPE> is the one of Schema.Types.(String | Number | Boolean | Mixed | TypedSchemaClass) 
 * @param type 
 */
export function ArrayOf(type: SupportedTypes | Function) {
    return DefineProperty(
        [{ type: toMatchTypes(type) }], 
        arrayOfDef()
    );
}

const arrayOfDef = () => ({
    default: [] 
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