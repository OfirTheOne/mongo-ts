import { Property } from '../property';
// import { Schema } from 'mongoose';

export function Unique(setTo: boolean = true) {
    return Property({ def : uniqueDef(setTo)});
}

const uniqueDef = (setTo: boolean) => ({
        unique: setTo
})


