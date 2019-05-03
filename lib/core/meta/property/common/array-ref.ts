import { Schema } from 'mongoose';
// import { MetadataAgent } from '../../../../helpers'
import { DefineProperty } from '../property';
export function ArrayRef(modelRefName: string) {
    return DefineProperty(
        [{ type: Schema.Types.ObjectId, ref: modelRefName }], 
        arrayRefDef(modelRefName)
    );
}

const arrayRefDef = (modelRefName: string) => ({
    default: [] 
})



