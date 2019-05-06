import { Schema } from 'mongoose';
import { DefineProperty } from '../property';
import { PropertyDefinition } from '../../../../models/external';

export function Ref(modelRefName: string, definition: Partial<PropertyDefinition> = {}) {
    return DefineProperty(Schema.Types.ObjectId, { ...definition, ...refDef(modelRefName) });
}

const refDef = (modelRefName: string) => ({
        ref: modelRefName
})

