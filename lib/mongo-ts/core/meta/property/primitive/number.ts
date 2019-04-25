import { Property } from '../property';
import { Schema } from 'mongoose';

export function Number(required: boolean = true) {
    return Property({ def : numberDef(required)});
}

const numberDef = (required: boolean) => ({
        type: Schema.Types.Number,
        required
})


