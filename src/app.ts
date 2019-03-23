/**
 * @author Ofir .G
 */
import './db/mongoose-init'; 
import './jwt-middle-init';  

import * as express from 'express';
import * as bodyParser from 'body-parser'
import { ErrorRequestHandler } from 'express';

// import './utils/seed-db';

import { generalRouter, apiRoutes } from './api/routes'



// ======================== Entity approach =========================== //
// import {routers} from '../lib/routes-connector'

class App {
    public instance : express.Application;
    constructor() {
        this.instance = express();
        this.initAppUsage();
    }

    private initAppUsage() {
        // must be called in this order.
        this.setBodyParser();
        this.setAccessControlHeaders();
        this.setRoutesConnection();
        this.setApiDoc()
        this.setErrorHandler();
    }

    private setBodyParser() {
        this.instance.use(bodyParser.json());
        this.instance.use(bodyParser.urlencoded({ extended: true }));	
    }

    private setAccessControlHeaders() {
        this.instance.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*");		
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");		
          next();		
        });

    }

    private setRoutesConnection() {
        this.instance.use('/', generalRouter);
        this.instance.use('/api', apiRoutes);
    }

    private setErrorHandler() {
        // catch not-found 404 and forward to error handler
        this.instance.use(function(req, res, next) {
            const err = new Error('Not Found') as Error & { status: number };
            err.status = 404;
            next(err);
        });
        
        
        // error handler
        this.instance.use(((err, req, res, next) => {
            if (err) {
            const status = 400 || err.status;
            res.status(status).json({error : err.message});
            }
        }) as ErrorRequestHandler);
    }

    private setApiDoc() {

        this.instance.use('/apiDoc', express.static(__dirname + '../../apiDocOutput'));
    }

}

export const app = new App().instance;
