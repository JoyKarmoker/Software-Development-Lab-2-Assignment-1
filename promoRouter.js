const express = require('express');
const bodyParser = require('body-parser');
 
const promoRouter = express.Router();
 
promoRouter.use(bodyParser.json());
 
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('All the employes will be promoted');
})
.post((req, res, next) => {
    res.end('POST method called and will be processed accordingly');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.patch((req, res, next) => {
    res.statusCode = 403;
    res.end('PATCH operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all the promotions');
});

promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will promote the employee with id ' +req.params.promoId);
})
.post((req, res, next) => {
    res.end('POST operation not supported on /promotions/:' +req.params.promoId);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Will Update the employee with id ' +req.params.promoId);
})
.patch((req, res, next) => {
    res.statusCode = 403;
    res.end('Will Update the employee with id ' +req.params.promoId);
})
.delete((req, res, next) => {
    res.end('Deleting the promotion of the employee with id ' +req.params.promoId);
});
 
module.exports = promoRouter;
