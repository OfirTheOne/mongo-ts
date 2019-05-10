
import { SchemaOptions } from 'mongoose';

export { PropertyDefinition } from './property-definition.model'



export interface TypedSchemaConfig {
    options: SchemaOptions,
    extendsMeta?: any,
}

export * from './utils';

/*

export interface PropertyDefinition  {
    required: boolean;
    unique: boolean;
    default: any;
    validate: RegExp | ((val: any) => boolean);
    index: boolean;
    // enum: string[];
}
*/
