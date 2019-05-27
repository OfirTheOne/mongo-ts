
import {SchemaTypeOpts } from 'mongoose';

export interface PropertyDefinition extends SchemaTypeOpts<any> {
    type: never;
} 
