const bcrypt    = require('bcrypt')

function existsOrError(element, error){
    if(!element) throw error
} 

function cryptr(pass){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pass,salt)
}

module.exports = {existsOrError , cryptr}