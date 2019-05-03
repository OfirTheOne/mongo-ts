import { Property } from '../property';

export function Required(setTo: boolean = true) {
    return Property({ def : requiredDef(setTo)});
}

const requiredDef = (setTo: boolean) => ({
    required: setTo
})


