const bcrypt        = require('bcrypt')
const { Secret }    = require('../../.env')
const jsonwebtoken  = require('jsonwebtoken')

function existsOrError(element, error){
    if(!element) throw error
} 

function cryptr(pass){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pass,salt)
}

function authenticateUser(req, res, next){
    const _token = req.headers['x-access-token']

    jsonwebtoken.verify(_token,Secret,(err, decoded)=>{
        if(err) return res.status(401).send('User not authorized.')

        req.id_user = decoded.id_user
        next()
    })
}

module.exports = { existsOrError , cryptr, authenticateUser }