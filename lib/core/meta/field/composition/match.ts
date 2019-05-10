import { createPropertyDecorator } from '../create-property-decorator';

export function Match(value: RegExp | string) {
    return createPropertyDecorator('Match', (targetPrototype: Object, propertyName: string) => {
        return {
            type: undefined,
            definition: requiredDef(value)
        }
    })
}

const requiredDef = (value: RegExp | string) => ({
    match: value
})


