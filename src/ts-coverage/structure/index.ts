import { RequestHandler } from 'express';


/*-- helpers types --*/

interface IError {
   [key: string]: any;
   message: string;
   code: string | number;
}

export type ControllerFunction = RequestHandler; 

export type ValidatorFunction = RequestHandler; 

export type HandlerCallback<R = any> = (err: IError, result: R) => void;

export type HandlerFunction<A = any, R = any> = (arg: A, cb: HandlerCallback<R>) => void;

