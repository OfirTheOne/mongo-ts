import * as mongoose from 'mongoose';


export class ExtendableMongooseDoc implements mongoose.Document {

    increment(): this {
        throw new Error("Method not implemented.");
    }    
    model<T extends mongoose.Document>(name: string): mongoose.Model<T> {
        throw new Error("Method not implemented.");
    }
    isDeleted(isDeleted: boolean): void;
    isDeleted(): boolean;
    isDeleted(isDeleted?: any): boolean | void {
        throw new Error("Method not implemented.");
    }
    remove(fn?: (err: any, product: this) => void): Promise<this> {
        throw new Error("Method not implemented.");
    }
    save(options?: mongoose.SaveOptions, fn?: (err: any, product: this) => void): Promise<this>;
    save(fn?: (err: any, product: this) => void): Promise<this>;
    save(options?: any, fn?: any): Promise<this> {
        throw new Error("Method not implemented.");
    }
    __v?: number;
    $isDefault(path?: string): boolean {
        throw new Error("Method not implemented.");
    }
    $session(session?: mongoose.ClientSession): mongoose.ClientSession {
        throw new Error("Method not implemented.");
    }
    depopulate(path?: string): this {
        throw new Error("Method not implemented.");
    }
    equals(doc: mongoose.MongooseDocument): boolean {
        throw new Error("Method not implemented.");
    }
    execPopulate(): Promise<this> {
        throw new Error("Method not implemented.");
    }
    isDirectSelected(path: string): boolean {
        throw new Error("Method not implemented.");
    }
    get(path: string, type?: any) {
        throw new Error("Method not implemented.");
    }
    init(doc: mongoose.MongooseDocument, opts?: any): this {
        throw new Error("Method not implemented.");
    }
    inspect(options?: any) {
        throw new Error("Method not implemented.");
    }
    invalidate(path: string, errorMsg: string | mongoose.NativeError, value?: any, kind?: string): boolean | mongoose.Error.ValidationError {
        throw new Error("Method not implemented.");
    }
    isDirectModified(path: string): boolean {
        throw new Error("Method not implemented.");
    }
    isInit(path: string): boolean {
        throw new Error("Method not implemented.");
    }
    isModified(path?: string): boolean {
        throw new Error("Method not implemented.");
    }
    isSelected(path: string): boolean {
        throw new Error("Method not implemented.");
    }
    markModified(path: string): void {
        throw new Error("Method not implemented.");
    }
    modifiedPaths(): string[] {
        throw new Error("Method not implemented.");
    }

    populate(callback: (err: any, res: this) => void): this;
    populate(path: string, callback?: (err: any, res: this) => void): this;
    populate(path: string, names: string, callback?: (err: any, res: this) => void): this;
    populate(options: mongoose.ModelPopulateOptions | mongoose.ModelPopulateOptions[], callback?: (err: any, res: this) => void): this;
    populate(path: any, names?: any, callback?: any): this {
        throw new Error("Method not implemented.");
    }
    populated(path: string) {
        throw new Error("Method not implemented.");
    }
    set(path: string, val: any, options?: any): this;
    set(path: string, val: any, type: any, options?: any): this;
    set(value: any): this;
    set(path: any, val?: any, type?: any, options?: any): this {
        throw new Error("Method not implemented.");
    }
    toJSON(options?: mongoose.DocumentToObjectOptions): string {
        throw new Error("Method not implemented.");
    }
    toObject(options?: mongoose.DocumentToObjectOptions): object {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
    unmarkModified(path: string): void {
        throw new Error("Method not implemented.");
    }
    update(doc: any, callback?: (err: any, raw: any) => void): mongoose.Query<any>;
    update(doc: any, options: mongoose.ModelUpdateOptions, callback?: (err: any, raw: any) => void): mongoose.Query<any>;
    update(doc: any, options?: any, callback?: any): mongoose.Query<any> {
        throw new Error("Method not implemented.");
    }

    updateOne(conditions: any, doc: any, callback?: (err: any, raw: any) => void): mongoose.Query<any> & any;
    updateOne(conditions: any, doc: any, options: mongoose.ModelUpdateOptions, callback?: (err: any, raw: any) => void): mongoose.Query<any> & any;
    updateOne(conditions: any, doc: any, options: any, callback?: (err: any, raw: any) => void): mongoose.Query<any> & any {
        throw new Error("Method not implemented.");
    }

    // updateMany(conditions: any, doc: any, callback?: (err: any, raw: any) => void): mongoose.Query<any> & any;
    // updateMany(conditions: any, doc: any, options: mongoose.ModelUpdateOptions, callback?: (err: any, raw: any) => void): mongoose.Query<any> & any;
    // updateMany(conditions: any, doc: any, options: any, callback?: (err: any, raw: any) => void): mongoose.Query<any> & any {
    //     throw new Error("Method not implemented.");
    // }

    validate(callback?: (err: any) => void): Promise<void>;
    validate(optional: any, callback?: (err: any) => void): Promise<void>;
    validate(optional?: any, callback?: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    validateSync(pathsToValidate?: string | string[]): mongoose.Error.ValidationError {
        throw new Error("Method not implemented.");
    }
    errors: any;
    _id: any;
    isNew: boolean;
    schema: mongoose.Schema<any>;
    id?: any;
    addListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    on(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    once(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    off(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    removeAllListeners(event?: string | symbol): this {
        throw new Error("Method not implemented.");
    }
    setMaxListeners(n: number): this {
        throw new Error("Method not implemented.");
    }
    getMaxListeners(): number {
        throw new Error("Method not implemented.");
    }
    listeners(event: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    rawListeners(event: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    emit(event: string | symbol, ...args: any[]): boolean {
        throw new Error("Method not implemented.");
    }
    listenerCount(type: string | symbol): number {
        throw new Error("Method not implemented.");
    }
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    eventNames(): (string | symbol)[] {
        throw new Error("Method not implemented.");
    }
    replaceOne(replacement: any, callback?: (err: any, raw: any) => void): mongoose.Query<any> {
        throw new Error("Method not implemented.");
    }
    base: typeof mongoose;
    baseModelName: string;
    collection: mongoose.Collection;
    db: mongoose.Connection;
    discriminators: any;
    modelName: string;


}
