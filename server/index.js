const http = require('http').Server()
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  console.log('client connected', socket.id)
  socket.emit('welcome', 'Connected to server')
  socket.on('msg', (payload) => {
    const h = 'hello'
    h.toLowerCase
    if (payload.toLowerCase() == 'bye') {
      socket.emit('close', 'GoodBye!')
      socket.disconnect()
    } else {
      socket.emit('response', 'OK')
    }
  })
})

http.listen(5000, () => {
  console.log('server is running live on the port', 5000)
})
