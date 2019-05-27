import { createPropertyDecorator } from './../create-property-decorator';

export function Default(value: any) {
    return createPropertyDecorator('Default', (targetPrototype: Object, propertyName: string) => {
        return {
            type: undefined,
            definition: booleanDef(value)
        }
    })
}

const booleanDef = (value: any) => ({
        default: value
})


