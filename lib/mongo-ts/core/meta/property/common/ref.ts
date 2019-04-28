import { Schema } from 'mongoose';
import { DefineProperty } from '../property';

export function Ref(modelRefName: string) {
    return DefineProperty(Schema.Types.ObjectId, refDef(modelRefName));
}

const refDef = (modelRefName: string) => ({
        ref: modelRefName
})

