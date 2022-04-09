const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { protect, adminAccess } = require('./middleware');
const userRouter = express.Router();
const User = require(__dirname + '/userModel.js')
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.json({ type: 'application/*+json' }));


userRouter.get('/', protect, adminAccess, async (req, res) => {
    try {
        const allUser = await User.find({});
         
        if(!allUser)
        {
            return res.status(200).send("There are no user");
        }
        else{
            return res.status(200).send(allUser);
        }
    } catch (err) {
        res.status(401).send("Coul not access the database");
    }
})

userRouter.post('/register', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        });

        await user.save();
        res.status(200).send('Register successfull');
    } catch (err) {
        res.status(500).send('Server error')
    }
})

userRouter.post('/login', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(401).send('Username and password required')
        }
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (!user) {
            return res.status(401).send('Usename or password incorrect')
        }

        // send jwt token
        const token = jwt.sign({ id: user._id }, "secret-code", {
            expiresIn: '30d'
        });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).send('Server error')
    }
})

module.exports = userRouter;