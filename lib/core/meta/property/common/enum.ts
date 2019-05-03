
import { PropertyDefinition } from '../../../../models/internal';
import { InferType } from '../../../infer-type';
import { MetadataAgent } from '../../../../helpers';

export function Enum(enumKeys: Array<string>, definition: Partial<PropertyDefinition> = {}) {
    return (targetPrototype: Object, propertyName: string): void => {
        const name = targetPrototype.constructor.name;
        if(!MetadataAgent.has(targetPrototype, `isProcessed:${name}`)) { 
            let type: any = InferType(targetPrototype, propertyName)
            if(type && type.name == 'Array') {
                type = [String];
            } else {
                type = String;
            }
            MetadataAgent.assign(targetPrototype, [`schemaDefinitions.${propertyName}`, { 
                ...enumDef(enumKeys, definition), 
                type 
            }]);
        }
    }
}

const enumDef = (enumKeys: Array<string>, definition: Partial<PropertyDefinition>) => ({
        enum: enumKeys,
        unique: definition.unique || false,
        required: definition.required || false,
        default: definition.default
});


