const express = require('express')
const app = express()
const path = require('path')

const neo = require('./neoDrive')

app.use(express.static(path.resolve(__dirname,'../..')))
app.use(express.json())
app.post('/neo/delete/rel',(req,res)=>{
    neo.deleteRel(req.body,(err,reply)=>{
        if(err){
            console.log(`Router: ${err}`)
            res.status(500).send(err.message)
        }
        res.send(reply)
    })
})
app.post('/neo/create/rel',(req,res)=>{
    neo.createRel(req.body,(err,reply)=>{
        if(err){
            console.log(`Router: ${err}`)
            res.status(500).send(err.message)
        }
        res.send(reply)
    })
})
app.post('/neo/create/nac',(req,res)=>{
    //console.log('Source: '+req.body.source)
    neo.createNac(req.body,(err,mess)=>{
        if(err){
            console.log('Router: '+err)
            res.status(500).send(err.message)
        }
        res.send(mess)
    })
})
app.post('/neo/delete/nac',(req,res)=>{
    neo.deleteNac(req.body,(err,mess)=>{
        //console.log('Delete callback: '+mess)
        if(err){
            console.log('Router: '+err)
            res.status(500).send(err.message)
        }
        res.send(mess)
    })
})
app.listen(3000,()=>{console.log('Listening on port 3000')})
