const jwt = require('jsonwebtoken')

function authorize(req, res, next) {
    if (req.role === 2) {
        next()
    }
    else {
        res.status(403)
        res.send('Forbidden')
        return
    }
}

function tokenauth(req, res, next) {
    try {

        if (!req.headers.authorization) {
            res.status(401)
            res.send('Unauthorized1')
            return
        }
        const token = req.headers.authorization.split(' ');

        const authtoken = token[1]

        const valid = jwt.verify(authtoken, 'secret')
        

        if (valid) {
            req.role = valid.role;
            next()
        }
        else {
            res.status(401)
            res.send('Unauthorized2')

        }
    } catch (err) {
        res.status(401)
        res.send('Unauthorized3')
    }
}


module.exports = {
    tokenauth,
    authorize,
}