import {Schema} from 'mongoose'

export interface OnSchemaCached {
    onSchemaCached(schema: Schema): void
}