const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter.use(bodyParser.json({ type: 'application/*+json' }))


const leadersSchema = new mongoose.Schema({
    name: String,
    image: String,
    designation: String,
    abbr: String,
    description: String,
    featured: Boolean
});
const Leader = mongoose.model('Leader', leadersSchema);

leaderRouter.route('/')
    .get((req, res, next) => {
        Leader.find({}, function (err, foundItems) {
            if (!err) {
                var count = foundItems.length;
                if (count === 0) {
                    res.send("There are no Leaders in the database");
                }
                else {
                    res.end('Found Leaders in the database, and they are: \n' + foundItems);
                }

            }

            else {
                res.end("Could not access the database");
            }
        });
    })


    .post((req, res, next) => {
        //Correct input format with feautred true
        if (req.body.name && req.body.image && req.body.designation && req.body.abbr && req.body.description && req.body.featured) {
            const leader = new Leader({
                name: req.body.name,
                image: req.body.image,
                designation: req.body.designation,
                abbr: req.body.abbr,
                description: req.body.description,
                featured: true
            });

            leader.save(function (err, result) {
                if (err) {
                    res.end("Some error occured and could not save the data");
                }
                else {
                    res.end("Successfully saved the data");
                }
            })
        }

        //Correct input format but featured is false
        else if (req.body.name && req.body.image && req.body.designation && req.body.abbr && req.body.description){
            const lead = new Leader({
                name: req.body.name,
                image: req.body.image,
                designation: req.body.designation,
                abbr: req.body.abbr,
                description: req.body.description,
                featured: false
            });

            lead.save(function (err, result) {
                if (err) {
                    res.end("Some error occured and could not save the data");
                }
                else {
                    res.end("Successfully saved the data");
                }
            })

        }

        //Wrong input fomat
        else {
            res.end("Wrong input form");
        }
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
        Leader.deleteMany({}, function(err){
            if(!err)
            {
                res.end("Deleted all the leaders from the database");
            }
            else
            {
                res.end("Some error occured and could not delete")
            }
        })
    });

leaderRouter.route('/:leaderId')
    /*.all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })*/

    .get((req, res, next) => {
        var id = new mongoose.Types.ObjectId(req.params.promoId);
        Leader.findById(id, function (err, foundItems) {
            if (!err) {
                if(foundItems)
                {
                    res.end('Found Items in the database with this id , and they are: \n' + foundItems); 
                }
                else
                {
                    res.end("There are no items with id " +id)
                }
                               
            }
            else {
                res.end("Could not access the database");
            }
        });
    })

    .post((req, res, next) => {
        res.end('POST operation not supported on /leaders/:' + req.params.leaderId);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Will Update the leader with id ' + req.params.leaderId);
    })
    .patch((req, res, next) => {
        res.statusCode = 403;
        res.end('Will Update the leader with id ' + req.params.leaderId);
    })
    .delete((req, res, next) => {
        var id = new mongoose.Types.ObjectId(req.params.promoId);
        Promotion.deleteOne({_id: id}, function(err, deletedPrmotions){
            if(!err)
            {
                if(deletedPrmotions. deletedCount === 1)
                {
                    res.end('Deleting the promotion of the employee with id ' + id);
                }
                else
                {
                    res.send("No item to delete with this id");
                }
                
            }
        });
    });

module.exports = leaderRouter;
