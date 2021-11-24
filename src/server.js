const { request } = require("express")
const express = require("express")
const server = express()

// Habilitar arquivos statics
server.use(express.static("public"))


//request, response 
server.get('/', (request, response) => {
    return response.sendFile(__dirname + "/views/index.html")
})

server.listen(3000, () => console.log('rodando'))
// 2:55:00