// import { MetadataAgent } from '../../../../helpers'
import { Property } from '../property';

export function Enum(enumKeys: Array<string>) {
    return Property({ def : enumDef(enumKeys)});
}

const enumDef = (enumKeys: Array<string>) => ({
        type: String,
        enum: enumKeys,
        unique: true
})

