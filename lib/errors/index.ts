
class BaseError extends Error {
    code: string;
    type: string;
    originalError: any;
    reason: string;
    constructor(params: { code: string, type: string, originalError?: any, massage: string, reason?: string }) {
        super(params.massage || params.reason || '');
        this.code = params.code;
        this.type = params.type;
        this.originalError = params.originalError;
        this.reason = params.reason;
    }
}


export class TypedSchemaDecoratorMissingError extends BaseError {
    constructor(massage?: string) {
        super({
            code: 'ERR_01',
            type: 'TypedSchemaDecoratorMissingError',
            massage: "The provided class missing 'TypedSchema' Decorator."
        })
    }
}


export class EmptyTypedSchemaClassError extends BaseError {
    constructor(massage?: string) {
        super({
            code: 'ERR_02',
            type: 'EmptyTypedSchemaClassError',
            massage: "TypedSchema class must contain at least one 'Property' decorated class member."
        })
    }
}
