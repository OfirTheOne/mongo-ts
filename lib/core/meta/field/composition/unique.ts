import { createPropertyDecorator } from '../create-property-decorator';


export function Unique(value: any = true) {
    return createPropertyDecorator('Unique', (targetPrototype: Object, propertyName: string) => {
        return {
            type: undefined,
            definition: uniqueDef(value)
        }
    })
}

const uniqueDef = (value: boolean) => ({
        unique: value
});


