import { Schema } from 'mongoose';
import { PropertyDefinition } from '../../../../models/external';
import { createPropertyDecorator } from '../create-property-decorator';

export function Ref(modelRefName: string, definition: Partial<PropertyDefinition> = {}) {

    return createPropertyDecorator('Ref',
        (targetPrototype: Object, propertyName: string) => {
            return {
                type: Schema.Types.ObjectId,
                definition: { ...definition, ref: modelRefName }
            };
        }
    )

    // return DefineProperty(, { ...definition, ...refDef(modelRefName) });
}

// const refDef = (modelRefName: string) => ({
//         ref: modelRefName
// })

