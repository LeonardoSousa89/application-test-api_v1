const _port     = 3002

const server    = require('./api/index')
const cors      = require('cors') 
const log       = require('morgan') 
const express   = require('express')
const app       = express()

app.use(cors({ methods:['GET','POST','PUT','DELETE'],
               origin: '192.168.100.20:3003'
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(log('dev'))
app.use('/', server)

app.listen(process.env.PORT || _port,()=>{
    console.log(`localhost:${_port}`)
})

