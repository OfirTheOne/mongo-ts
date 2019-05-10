import {Schema} from 'mongoose'

export interface OnSchemaCreated {
    onSchemaCreated(schema: Schema): void
}