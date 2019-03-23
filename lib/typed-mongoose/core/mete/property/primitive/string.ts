import { Property } from '../property';
import { Schema } from 'mongoose';

export function String(required: boolean = true) {
    return Property({ def : stringDef(required)});
}

const stringDef = (required: boolean) => ({
        type: Schema.Types.String,
        required
})


