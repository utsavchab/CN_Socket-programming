const socketIoClient = require('socket.io-client')
const http = require('http').Server()

const socket = socketIoClient('http://localhost:5000')

socket.on('connect', () => {
  console.log('client 2 connected to server')
  socket.emit('client2')
})

socket.on('print', (payload) => {
  console.log(payload)
})
http.listen(3001, () => {
  console.log('client 2 is running on port', 3000)
})
