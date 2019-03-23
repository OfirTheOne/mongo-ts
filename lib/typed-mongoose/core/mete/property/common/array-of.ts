import { Schema } from 'mongoose';
import { Property } from '../property';

type SupportedTypes = 'string' | 'number' | 'boolean' | 'any'; // any is mixin

/**
 * @description 
 *  using the standard syntax:  
 *  { type: [{ type: <TYPE>, default: [] }] }
 *  where <TYPE> is the one of Schema.Types.(String | Number | Boolean | Mixed) 
 * @param type 
 */
export function ArrayOf(type: SupportedTypes) {
    return Property({ def : arrayOfDef(type)});
}

const arrayOfDef = (type: SupportedTypes) => ({
    type: [{
        type: toMatchTypes(type) 
    }], 
    default: [] 
})



const toMatchTypes = (type: SupportedTypes) => {
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
            return Schema.Types.Mixed;
    }
} 