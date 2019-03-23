
import {Router} from 'express';

const generalRouter = Router();
generalRouter.get('/', (req, res, next) => {
    res.send('hello from epicure-project');
});
generalRouter.all('/test', (req, res, next) => {
    res.send();
}); 

export { generalRouter };