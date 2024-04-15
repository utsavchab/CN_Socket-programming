const http = require('http').Server()
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  console.log('client connected', socket.id)
  socket.emit('welcome', 'Connected to server')
  socket.on('msg', (payload) => {
    try {
      const result = eval(payload)
      socket.emit('response', result)
    } catch (err) {
      socket.emit('close', 'invalid input')
    }
  })
})

http.listen(5000, () => {
  console.log('server is running live on the port', 5000)
})
