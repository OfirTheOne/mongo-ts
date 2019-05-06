import {Schema} from 'mongoose'

export interface OnSchemaBound {
    onSchemaBound(schema: Schema): void
}