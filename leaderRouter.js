const express = require('express');
const bodyParser = require('body-parser');
 
const leaderRouter = express.Router();
 
leaderRouter.use(bodyParser.json());
 
leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('All the leaders will be send');
})
.post((req, res, next) => {
    res.end('POST method called and will be processed accordingly');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.patch((req, res, next) => {
    res.statusCode = 403;
    res.end('PATCH operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all the leaders');
});

leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send the leader  with id ' +req.params.leaderId);
})
.post((req, res, next) => {
    res.end('POST operation not supported on /leaders/:' +req.params.leaderId);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Will Update the leader with id ' +req.params.leaderId);
})
.patch((req, res, next) => {
    res.statusCode = 403;
    res.end('Will Update the leader with id ' +req.params.leaderId);
})
.delete((req, res, next) => {
    res.end('Deleting the leader with id ' +req.params.leaderId);
});
 
module.exports = leaderRouter;
