const db        = require('../db/db')
const methods   = require('../api/methods/index')
const bcrypt    = require('bcrypt')
const express   = require('express')
const server    = express.Router()

const { Secret }    = require('../.env')
const jsonwebtoken  = require('jsonwebtoken')



server.route('/app/users/:id').get(methods.authenticateUser,async(req, res)=>{

   return await db.select(['id_user','username','email','id_data','title','anotation'])
        .from('user_app')
        .join('user_app_data','id_user','id_user_app_data')
        .where('id_user', req.params.id)
        .then(response => res.status(200).json(response))
        .catch(err     => res.status(404).send(err))

}).post(methods.authenticateUser,async(req, res)=>{
    const USER = { ...req.body }

    const data = {
        title: USER.title,
        anotation: USER.anotation,
        id_user_app_data: req.params.id
    }

    return await db.insert(data)
        .from('user_app_data')
        .then(_        => res.status(201).send('Data inserted.'))
        .catch(err     => res.status(404).send(err))
})

server.route('/app/create-account').post(async(req, res)=>{

    const USER = { ...req.body }

    try{
        methods.existsOrError(USER.username,'Username invalid.')
        methods.existsOrError(USER.email,   'Email cannot is empty.')
        methods.existsOrError(USER.pass,    'Pass cannot is empty.')
    }catch(err){
        return res.status(400).send(err)
    }

    USER.pass = methods.cryptr(USER.pass)

    return await db.insert(USER)
        .from('user_app')
        .then(_      => res.status(201).send('User created.'))
        .catch(_     => res.status(400).send('Username or Email invalid.'))
 })

 server.route('/app/login').post(async(req,res)=>{
    const USER = { ...req.body }

    try{
        methods.existsOrError(USER.email, 'Email invalid.')
        methods.existsOrError(USER.pass,  'Pass invalid.')
    }catch(err){
        return res.status(400).send(err)
    }

    const search = await db.where({email: USER.email}).from('user_app').first()

    if(!search) return res.status(404).send('User not found.')

    if(search){
        const passwordCompare = bcrypt.compareSync(USER.pass,search.pass)

        if(!passwordCompare) return res.status(401).send('Email/password invalid.')

        if(passwordCompare) {

            return db.where({email: USER.email})
                .first()
                .from('user_app')
                .then(response => {
                res.status(200).json({
                    id_user:response.id_user,
                    auth:true,
                    _token: jsonwebtoken.sign({id_user: response.id_user},Secret,{ expiresIn: 60 * 5 }),
                            })
                })
                .catch(err => res.status(400).json(err))
        }
    }
 })



module.exports = server