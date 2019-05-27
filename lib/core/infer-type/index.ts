
import { Schema } from 'mongoose';
import 'reflect-metadata'


export function InferType(targetPrototype: Object, propertyName: string): Function {
    const inferredTypeCtor = Reflect.getMetadata('design:type', targetPrototype, propertyName)

    if(inferredTypeCtor !== undefined && inferredTypeCtor !== null) {
        // try {
        //     return supportedCtors(inferredTypeCtor)
        // } catch (error) {
        //     throw new Error('cant infer type');
        // }
        return inferredTypeCtor
    } else {
        throw new Error('failed to reflect field type');
    }

}

// map the provided ctors function to the native mongoose ctors
function supportedCtors(typeCtor: Function) {
    const name = typeCtor.name
    switch (name) {
        case 'String':
            return Schema.Types.String
        case 'Number':
            return Schema.Types.Number
        case 'Boolean':
            return Schema.Types.Boolean
        case 'Date':
            return Schema.Types.Date
        case 'Object':
            return Schema.Types.Mixed
        case 'Array':
            return Schema.Types.Array
        default:
            throw new Error('cant infer type');
    }
}
