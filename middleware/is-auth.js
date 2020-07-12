const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // normal header has fromat 'Authorization: Bearer tokentokentokentokentoken' thats why I get Authorization value here 
    const authHeader = req.get('Authorization');
    // set isAuth (custom field) to false if there is no header in a first place
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    // then split string after "bearer" and remove it by selecting second item in an array, which is token
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretkey');
    } catch (error) {
        req.isAuth = false;
        return next();
    }
    if(!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}