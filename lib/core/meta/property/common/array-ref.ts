import { Schema } from 'mongoose';
import { DefineProperty } from '../property';
import { PropertyDefinition } from '../../../..//models/internal';

export function ArrayRef(modelRefName: string, definition: Partial<PropertyDefinition> = {}) {
    return DefineProperty(
        [{ type: Schema.Types.ObjectId, ref: modelRefName }],{
            ...definition, 
            // ...arrayRefDef()
        });
}

const arrayRefDef = (modelRefName: string) => ({
    // default: [] 
})



