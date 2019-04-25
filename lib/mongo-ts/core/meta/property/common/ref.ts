import { Schema } from 'mongoose';
// import { MetadataAgent } from '../../../../helpers'
import { Property } from '../property';

export function Ref(modelRefName: string) {
    return Property({ def : refDef(modelRefName)});
}

const refDef = (modelRefName: string) => ({
        type: Schema.Types.ObjectId,
        ref: modelRefName
})

