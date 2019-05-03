import { Property } from '../property';
import { Schema } from 'mongoose';
import { PropertyDefinition } from '../../../../models/internal';

export function Boolean(definition: Partial<PropertyDefinition> = {}) {
    return Property(Schema.Types.Boolean,  booleanDef(definition));
}

const booleanDef = (definition: Partial<PropertyDefinition>) => ({
    required: definition.required || false,
    unique: definition.unique || false,
    default: definition.default || undefined,
    validate: definition.validate || undefined,
});

