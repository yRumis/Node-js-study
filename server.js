const express = require("express")

const app = express()

app.use(express.json())

 const users = [];

// middleware de log 
 app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`)
    next();
 })

app.get("/", (req, res)=>{

    res.send("Servidor express funcionando")
})

app.get("/users", (req,res)=>{

    res.json(users)
})

// middleware post

function validateUser(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error: "nome obrigatorio"})

    }
    next()
}

app.post("/users", validateUser, (req, res)=>{

    const user = req.body
    users.push(user)
    res.json({
        message: "usuario criado",
        users: users
    })
})

// curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":""}' to test the post via terminal     

app.listen(3000);