const _port     = 3002

const server    = require('./api/index')
const cors      = require('cors') 
const log       = require('morgan') 
const express   = require('express')
const app       = express()

const headers = new Headers()
headers.append('Access-control-Allow-Origin','https://anotation-app.herokuapp.com')
headers.append('Access-control-Allow-Credentials',true)
headers.append('Access-control-Allow-Headers','Origin, Content-Type, Accept, Authorization')

app.use(cors(headers))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(log('dev'))
app.use('/', server)

app.listen(process.env.PORT || _port,()=>{
    console.log(`localhost:${_port}`)
})

