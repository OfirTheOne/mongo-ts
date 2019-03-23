import { Property } from '../property';
// import { Schema } from 'mongoose';

export function Default(value?: any) {
    return Property({ def : booleanDef(value)});
}

const booleanDef = (value: any) => ({
        default: value
})


