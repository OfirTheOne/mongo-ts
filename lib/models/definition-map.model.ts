
import { PropertyDefinition } from './property-definition.model';

export interface FieldDefinition {
    generator?: (name: string, type: Function) => PropertyDefinition,
    definition: Partial<PropertyDefinition>,
    type?: Function
    mergeWithProvided?: boolean
}

export interface DefinitionMap {
    byDecorator : { [key: string]: FieldDefinition },
    byType : { [key: string]: FieldDefinition }, 
    byField : { [key: string]: FieldDefinition },
}


