import express from 'express'

//instanciando o express
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

const mockUsers = [
    {id:1, username:"demetrio", displayName:"Demetrio"},
    {id:2, username:"jack", displayName:"Jack"},
    {id:3, username:"adam", displayName:"Adam"},
    {id:4, username:"tina", displayName:"Tina"},
    {id:5, username:"jason", displayName:"Jason"},
    {id:6, username:"henry", displayName:"Henry"},
    {id:7, username:"marilyn", displayName:"Marilyn"},
    {id:8, username:"anson", displayName:"Anson"},
]

//rotas
app.get("/", (req,res)=>{
    res.status(201).send({mensagem: "Olá Express"})
})

app.get('/api/users', (req,res)=>{
    console.log(req.query)
    const {query:{filter, value}} = req                
            if(filter && value) return res.send(
                mockUsers.filter((user)=> user[filter].includes(value))
            )
        return res.send(mockUsers)
})
    //rota post
    app.post('/api/users', (req,res)=>{
        const {body} = req
        const newUser = {id:mockUsers[mockUsers.length-1].id+1,...body}
        mockUsers.push(newUser)
        return res.status(201).send(newUser)
    })

app.get("/api/users/:id", (req,res)=>{
    console.log(req.params)
    const parseId = parseInt(req.params.id)
    console.log(parseId)
        if (isNaN(parseId)) return res.status(400).send({mensagem: "Erro na requisição. ID inválido"})
    const findUsers = mockUsers.find((user)=> user.id === parseId)
        if(!findUsers) return res.sendStatus(404)
        return res.send(findUsers)
})

app.get('/api/products', (req,res)=>{
    res.send([
        {id:123, name: 'frango frito', preco:12.99}
    ])
})

//rota PUT
app.put("/api/users/:id", (req, res)=>{
    const {
        body, 
        params:{id}
    } =req
        const parsedId =parseInt(id)
        //verificando se o id digitado foi valido
            if(isNaN(parsedId)) return res.sendStatus(400)

        const findUserIndex = mockUsers.findIndex(
            (user)=>user.id === parsedId)

            //se o findIndex falhar retorna -1
            if(findUserIndex === -1) return res.sendStatus(404)
            //pegando o usuario 
        mockUsers[findUserIndex]={ id: parsedId, ...body}
            return res.sendStatus(200)
})

//Rota PATCh --------------
app.patch("/api/users/:id", (req,res)=>{
    const {
        body,
        params: {id},
    } = req

    const parsedId = parseInt(id)
        if(isNaN(parsedId)) return res.sendStatus(400)
            const findUserIndex = mockUsers.findIndex((user)=>user.id === parsedId)
        if (findUserIndex === -1) return res.sendStatus(404)
            mockUsers[findUserIndex]={...mockUsers[findUserIndex], ...body}
            return res.sendStatus(200)
})

//Rota DELETE
app.delete("/api/users/:id", (req,res)=>{
    const {
        params:{id}} 
    =req
    const parsedId = parseInt(id)
        if(isNaN(parsedId)) return res.sendStatus(400)
    const findUserIndex = mockUsers.findIndex((user)=> user.id ===parsedId)
        if (findUserIndex === -1) return res.sendStatus(404)
    mockUsers.splice(findUserIndex,1)
    return res.sendStatus(200)
})


//--------------------------
app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})

