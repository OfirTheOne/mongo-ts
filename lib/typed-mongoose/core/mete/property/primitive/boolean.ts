import { Property } from '../property';
import { Schema } from 'mongoose';

export function Boolean(required: boolean = true) {
    return Property({ def : booleanDef(required)});
}

const booleanDef = (required: boolean) => ({
        type: Schema.Types.Boolean,
        required
})


