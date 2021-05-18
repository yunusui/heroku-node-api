const jwt = require('jsonwebtoken');

module.exports = ( req,res, next )=>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('access denied');

    try {
        const verifyToekn = jwt.verify(token, process.env.Secret_Token );
        req.user = verifyToekn;
        next();
    } catch (error) {
        res.status(400).send('invalid Token')
    }

}