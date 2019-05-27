import { Schema } from 'mongoose';
import { PropertyDefinition } from '../../../..//models/internal';
import { createPropertyDecorator } from '../create-property-decorator';


export function ArrayRef(modelRefName: string, definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('ArrayRef', (targetPrototype: Object, propertyName: string) => {
        return {
            type: [{ type: Schema.Types.ObjectId, ref: modelRefName }],
            definition
        }
    });
}




