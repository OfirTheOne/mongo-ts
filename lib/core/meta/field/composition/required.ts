import { createPropertyDecorator } from '../create-property-decorator';


export function Required(value: (boolean | string) = true) {
    return createPropertyDecorator('Required', (targetPrototype: Object, propertyName: string) => {
        return {
            type: undefined,
            definition: requiredDef(value)
        }
    })
}

const requiredDef = (value: boolean | string) => ({
    required: value
});


