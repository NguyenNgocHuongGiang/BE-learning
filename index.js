import express, { json } from 'express'

const app = express()

// them middleware de doc json
app.use(express.json())

app.get(`/`, (req, res)=>{
    res.send("hello hi")
})

app.get(`/test`, (req, res)=>{
    res.send("test")
})

app.post('/user/:id/:name', (req,res) => {
    let params = req.params
    let {id, name} = params
    let body = req.body
    res.send({
        id,
        name
    })
})

//truy van tu url (?ten='giang')
app.get(`/test-query`, (req, res)=>{
    let query = req.query
    res.send(query)
})

//get header tu req
app.get(`/test-header`, (req, res)=>{
    let headers = req.headers
    res.send(headers)
})

app.listen(8080, () => {
    console.log("server is running in port 3000");
})