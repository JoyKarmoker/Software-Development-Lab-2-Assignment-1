const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/assignmentdb');
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.use(bodyParser.json({ type: 'application/*+json' }))

const promotionsSchema = new mongoose.Schema({
    name: String,
    image: String,
    label: String,
    price: Number,
    description: String,
    featured: Boolean
});

const Promotion = mongoose.model('Promotion', promotionsSchema);

promoRouter.route('/')
    .get((req, res, next) => {
        Promotion.find({}, function (err, foundItems) {
            if (!err) {
                var count = foundItems.length;
                if(count === 0)
                {
                    res.send("There are no pormotions in the database");
                }
                else
                {
                    res.end('Found Items in the database, and they are: \n' + foundItems);
                }
                
            }

            else {
                res.end("Could not access the database");
            }
        });

    })

    .post((req, res, next) => {
       
        //Correct input format with feautred true
        if (req.body.name && req.body.image && req.body.label && req.body.price && req.body.description && req.body.featured) {
            const promo = new Promotion({
                name: req.body.name,
                image: req.body.image,
                label: req.body.label,
                price: req.body.price,
                description: req.body.description,
                featured: true
            });

            promo.save(function(err, result){
                if(err)
                {
                    res.send("Some error occured and could not save the data");
                }
                else
                {
                    res.send("Successfully saved the data");
                }
            })
        }   

        //Correct input format but featured is false
        else if(req.body.name && req.body.image && req.body.label && req.body.price && req.body.description) {
            const promo = new Promotion({
                name: req.body.name,
                image: req.body.image,
                label: req.body.label,
                price: req.body.price,
                description: req.body.description,
                featured: false
            });
            
            promo.save(function(err, result){
                if(err)
                {
                    console.log("Inside else if\n");
                    res.send("Some error occured and could not save the data");
                }
                else
                {
                    res.send("Successfully saved the data");
                }
            })

        }

        //Wrong input fomat
        else {
            res.send("Wrong input form");
        }

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
        Promotion.deleteMany({}, function(err){
            if(!err)
            {
                res.end("Deleted all the elements from the database");
            }
        })
    });

promoRouter.route('/:promoId')    
    .get((req, res, next) => {
        var id = new mongoose.Types.ObjectId(req.params.promoId);
        Promotion.findById(id, function (err, foundItems) {
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
        res.end('POST operation not supported on /promotions/:' + req.params.promoId);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Will Update the employee with id ' + req.params.promoId);
    })
    .patch((req, res, next) => {
        res.statusCode = 403;
        res.end('Will Update the employee with id ' + req.params.promoId);
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

module.exports = promoRouter;
