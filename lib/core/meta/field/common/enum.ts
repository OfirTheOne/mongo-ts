
import { PropertyDefinition } from '../../../../models/internal';
import { InferType } from '../../../infer-type';
import { MetadataAgent } from '../../../../helpers';
import { Schema } from 'mongoose';
import { createPropertyDecorator } from '../create-property-decorator';

export function Enum(enumKeys: Array<string>, definition: Partial<PropertyDefinition> = {}) {

    return createPropertyDecorator('Enum',
        (targetPrototype: Object, propertyName: string) => {
            let type: any = InferType(targetPrototype, propertyName)
            type = (type && type.name == 'Array') ? [Schema.Types.String] : Schema.Types.String;

            return {
                type,
                definition:  { enum: enumKeys, }
            }
        }
    );

    /*
    return (targetPrototype: Object, propertyName: string): void => {
        const name = targetPrototype.constructor.name;
        let type: any = InferType(targetPrototype, propertyName)
        type = (type && type.name == 'Array') ? [Schema.Types.String] : Schema.Types.String;
        DefineProperty(type, enumDef(enumKeys, definition))
    
    }
    */
}

const enumDef = (enumKeys: Array<string>, definition: Partial<PropertyDefinition>) => ({
        enum: enumKeys,
});


