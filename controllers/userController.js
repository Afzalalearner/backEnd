const userRepository = require('./../repositories/userRepository')
const crypto = require('./../utils/crypto')
const jwt = require('jsonwebtoken')


// const get = async (req, res) => {
//     try {
//         const data = await userRepository.get()
//         res.status(200)
//         res.send(data)

//     } catch (err) {
//         console.error(err)
//         res.status(500)

//         res.send('Internal Server Error')
//     }

// }

const userAlreadyExists = (err) => {
    return err && err.message && err.message.indexOf('duplicate key') > -1
}




const signup = async (req, res) => {
    try {

        const data = req.body;
        data.createdDate = Date.now()

        const password1 = req.body.password;
        const password2 = req.body.confirmPassword;
        if (password1 === password2) {

            const hash = await crypto.getHash(password1)

            req.body.password = hash
            req.body.confirmPassword = hash
            req.body.role = 1;

            await userRepository.create(data)
            res.status(201)
            res.send()
        } else {
            res.status(400)
            res.send('Password and Confirm Password Does not match')

        }

    } catch (err) {
        if (userAlreadyExists(err)) {
            res.status(409)
            res.json('User Already Exists')
            return
        }


        res.status(500)
        res.send('Internal Server Error')
    }

}

const signin = async (req, res) => {
    try {
        const data = req.body
        const user = await userRepository.getByUsername(data.username)
        if (!user) {
            res.status(400)
            res.send("User Doesn't exist")
            return
        }
        const valid = await crypto.verify(data.password, user.password)
        if (valid) {
            const token = jwt.sign({
                username: user.username, role: user.role,
                firstName: user.firstName, lastName: user.lastName, email: user.email
            }, 'secret', { expiresIn: '1h' })

            res.status(200)
            res.json({username:user.username,token:token})
        } else {

            res.status(401)
            res.send("Invalid Username or Password")
        }


    } catch (err) {
        res.status(500)
        res.send('Internal Server Error')
    }
}

module.exports = {
    // get,
    signup,
    signin,
}