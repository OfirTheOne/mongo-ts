import { isTypedSchemaClass } from "../../../helpers";
import { toSchema } from "../../to-schema";

export function handleProvidedType(type: any) {
    let _type = type;

    if(Array.isArray(_type) && _type.length == 1 && isTypedSchemaClass(type[0])) {
        // case where 'type' is array (tuple) of TypedSchemaClass --> must go through toSchema
        _type = [toSchema(type[0])]
    } else if(isTypedSchemaClass(type)) {
        // case where 'type' a TypedSchemaClass --> must go through toSchema
        _type = toSchema(type)
    }
    return _type;
}