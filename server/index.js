const http = require('http').Server()
const io = require('socket.io')(http)
const fs = require('fs')

let client1
let client2
io.on('connection', (socket) => {
  if (client1) {
    console.log('client 1', client1)
  }
  if (client2) {
    console.log('client 2', client2)
  }

  socket.emit('welcome', 'Connected to server')

  socket.on('msg', (payload) => {
    io.emit('response', payload)
  })

  socket.on('client1', () => {
    client1 = socket.id
  })

  socket.on('client2', () => {
    client2 = socket.id
  })

  socket.on('file', (payload) => {
    console.log('file')
    console.log(payload.extension)
    fs.writeFileSync(`received.${payload.extension}`, payload.data)
    socket.emit('file received')
  })
})

http.listen(5000, () => {
  console.log('server is running live on the port', 5000)
})
