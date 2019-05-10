
export type SubType<Base, Condition> = 
Pick<Base, { [Key in keyof Base]: Base[Key] extends Condition ? Key : never }[keyof Base]>;

type ExcludeSubType<Base, NegateCondition> = 
Pick<Base, { [Key in keyof Base]: Base[Key] extends NegateCondition ? never : Key}[keyof Base]>;


export type ExtractFunction<T> = SubType<T, ((_: any)=>any)>;

export type ExtractProperty<T> = ExcludeSubType<T, ((_: any)=>any)>;

export type Ctor<T = any> = new(...args:any[]) => T;


/*
// Usage: 

class Schema {
    static type = 'Schema';

    name: string;
    id: number;

    save() : boolean {
        return true;
    }

    static findAll(): any[] {
        return [];
    }
}

type SchemaProps = ExtractProperty<Schema>
type SchemaStaticProps = ExtractProperty<typeof Schema>
type SchemaInstanceMethods = ExtractFunction<Schema>
type SchemaStaticMethods = ExtractFunction<typeof Schema>
*/


