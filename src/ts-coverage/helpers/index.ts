
/*-- util types --*/

export type ReMap<M, R> = { [key in keyof M]: (R | ReMap<M[key], R>) } // retype keys of a map 'M' to a different type 'R' 


export type Mesh<T01, T02, T03 = T02, T04 = T03, T05 = T04> = T01 & T02 & T03 & T04 & T05;  // Mesh up to 5 types (2 minimum)  in to one

export interface BoundTo<C> { (this: C): any }

export interface BoundMethod<C, A extends any[] = any[], R = any> { (this: C, ...args: A): R }


