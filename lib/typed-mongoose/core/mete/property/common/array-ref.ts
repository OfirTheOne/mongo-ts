import { Schema } from 'mongoose';
// import { MetadataAgent } from '../../../../helpers'
import { Property } from '../property';
export function ArrayRef(modelRefName: string) {
    return Property({ def : arrayRefDef(modelRefName)});
}

const arrayRefDef = (modelRefName: string) => ({
    type: [{
        type: Schema.Types.ObjectId, 
        ref: modelRefName
    }], 
    default: [] 
})



