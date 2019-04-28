import { Property } from '../property';
import { Schema } from 'mongoose';
import { PropertyDefinition } from './../../../../models/internal'

export function Number(definition: Partial<PropertyDefinition> = {}) {
    return Property(Schema.Types.Number, numberDef(definition));
}

const numberDef = (definition: Partial<PropertyDefinition>) => ({
        required: definition.required || false,
        unique: definition.unique || false,
        default: definition.default || undefined,
        validate: definition.validate || undefined,
})


