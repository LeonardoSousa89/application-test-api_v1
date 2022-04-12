const knexfile  = require('../knexfile')['production']
const db        = require('knex')(knexfile)

module.exports  = db