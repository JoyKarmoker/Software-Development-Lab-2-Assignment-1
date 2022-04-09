const User = require(__dirname + '/userModel.js');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.protect = async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
       
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).send("You are not logged in! Please log in to access");
    }


    // 2) Verification token
    let decoded
    try {
        decoded = await promisify(jwt.verify)(token, 'secret-code')
    } catch (err) {
        return res.status(401).send('Invalid jwt token')
    }

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
        return res.send(401).send("The user belonging to this token no longer exists");
    }

    req.user = currentUser;
    next();
}

//Checking Admin privileges
exports.adminAccess = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(401).send('Access denied.')
    }
    return next();
}